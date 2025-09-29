/**
 * Asigna un video a un usuario revisor
 * @param {object} event.body Incluye el id del usuario y el id del video por asignar
 * {
 *     "video": string
 *     "usuario": string,
 * }
*/

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    
    // Verificar que el contenido no sea vacío
    if (!data) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    try {
        const videoInicial = await VideoSchema.findById( data.video )
        let usuario = await UsuarioSchema.findById( data.usuario )
        let video = {}
        
        // Comprobaciones y validaciones
        if ( !videoInicial ) 
            throw createError({ statusCode: 400, statusMessage: 'No se ha encontrado un video con el id proporcionado.' })
        
        // En caso de incluir body.usuario, se asignará a un admin u otro usuario
        if ( !usuario ){
            usuario = await UsuarioSchema.findOne({ admin: true }) || await UsuarioSchema.findOne()
        }

        // ** Video **
        // Se busca si existen videos en revision o no.
        video = await VideoSchema.findById( data.video ).populate({
            // Dentro de conjunto
            path: 'adicional.parent',
            select: 'adicional.videos',
            model: 'Conjunto',
            populate:{
                path: 'adicional.videos',
                match: { 'adicional.inReview': true }, // solo poblar los videos que esten en revisión
                select: 'adicional.inReview',
                model: 'Video',
            }
        })
        
        // ** Usuario **
        // Asignar el conjunto a revisar al usuario
        await UsuarioSchema.findByIdAndUpdate(
            usuario._id,
            { $addToSet: { review: video.adicional.parent } },
            { new: true, timestamps: false }
        )
        
        // ** Conjunto **
        const conjunto = await ConjuntoSchema.findById( video.adicional.parent )
        
        // Asignar el usuario al conjunto por revisar
        if( !conjunto.adicional.review.includes( usuario )) 
            conjunto.adicional.review.push( usuario )
        
        // Guardar el conjunto actualizado
        await conjunto.save()

        // Finalmente, asignar o marcar el video en revisión
        await VideoSchema.findByIdAndUpdate(
            video._id,
            { "adicional.inReview": true },
            { new: true, timestamps: false }
        )
        
        return video
    }
    catch (error) {
        throw createError({statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
})