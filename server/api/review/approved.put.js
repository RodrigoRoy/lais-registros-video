/**
 * Aprueba un registro de video
 * @param {object} event.body Incluye el id del video para aprobar
 * {
 *     "video": string,
 * }
*/

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    
    // Verificar que el contenido no sea vacío
    if (!data) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    try {
        // ** Video **
        // El video pasa a estar revisado. Es decir, ya no se encuentra en revisión.
        const video = await VideoSchema.findByIdAndUpdate(
            data.video,
            { "adicional.inReview": false },
            { new: true, timestamps: false }
        )
        const conjuntoPadre = video.adicional.parent

        // ** Conjunto **
        // Se busca si existen videos en revision o no.
        const conjunto = await ConjuntoSchema.findById( conjuntoPadre ).populate([
            {  // Dentro de Videos
                path: 'adicional.videos',
                match: { 'adicional.inReview': true }, // solo poblar los videos que esten en revisión
                select: 'adicional.inReview',
                model: 'Video',
            },
            {   // Dentro de usuarios
                path: 'adicional.review',
                select: 'fullname',
                model: 'Usuario',
            }
        ])

        // Conocer la lista de los videos y usuarios del conjunto para trabajar con ellos
        const listaVideos = conjunto.adicional.videos
        const listaUsuarios = conjunto.adicional.review

        // Cuando los videos dentro ya hayan sido revisados, se deben quitar referencias de Conjunto y Usuario entre si
        if ( listaVideos.length === 0 ){

            // Quitando referencia del conjunto en la lista 'review' de cada usuario
            await UsuarioSchema.updateMany(
                { '_id': { $in: listaUsuarios } },
                { $pull: { review: conjunto._id } }
            )

            // Quitando referencia de usuarios en el Conjunto
            conjunto.adicional.review = []
        }

        conjunto.save()

        return video
    }
    catch (error) {
        throw createError({statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
})