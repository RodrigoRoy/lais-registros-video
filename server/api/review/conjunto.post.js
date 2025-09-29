/**
 * Asigna un conjunto documental a un usuario revisor
 * @param {object} event.body Incluye el id del usuario y el id del conjunto por asignar
 * {
 *     "usuario": string,
 *     "conjunto": string
 * }
*/

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    
    // Verificar que el contenido no sea vacío
    if (!data) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    try {
        const conjuntoInicial = await ConjuntoSchema.findById( data.conjunto )
        const usuarioInicial = await UsuarioSchema.findById( data.usuario )
        let usuario = {}
        let conjunto = {}

        // Comprobaciones y validaciones
        if ( !usuarioInicial ) 
            throw createError({ statusCode: 400, statusMessage: 'No se ha encontrado un usuario con el id proporcionado.' })

        if ( !conjuntoInicial ) 
            throw createError({ statusCode: 400, statusMessage: 'No se ha encontrado un conjunto con el id proporcionado.' })

        if( conjuntoInicial.adicional.videos?.length === 0 )
            throw createError({ statusCode: 400, statusMessage: 'El conjunto no contiene videos para asignar revisión.' })
        
        // ** Usuario **
        // Asignar el conjunto a revisar al usuario
        usuario = await UsuarioSchema.findByIdAndUpdate(
            data.usuario,
            { $addToSet: { review: data.conjunto } },
            { new: true, timestamps: false }
        )

        // ** Conjunto **
        conjunto = await ConjuntoSchema.findById( data.conjunto ).populate({
            path: 'adicional.videos',
            select: 'adicional.inReview'
        })
        
        // Todos los videos pasan a estar en revisión
        conjunto.adicional.videos.forEach( async video => {
            await VideoSchema.findByIdAndUpdate(
                video._id,
                { "adicional.inReview": true },
                { new: true, timestamps: false }
            )
        })

        // Asignar el usuario al conjunto por revisar
        if( !conjunto.adicional.review.includes( data.usuario )) 
            conjunto.adicional.review.push( data.usuario )

        // Guardar el conjunto actualizado
        await conjunto.save()
        
        return { conjunto: conjunto, usuario: usuario }
    }
    catch (error) {
        throw createError({statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
})