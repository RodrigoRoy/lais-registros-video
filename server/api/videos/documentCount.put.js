/**
 * Aumenta el contador de documento de calificación
 * @param {object} event.body Incluye el id del video
 * {
 *     "video": string
 * }
*/

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    
    // Verificar que el contenido no sea vacío
    if (!data) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    try {
        // Comprobaciones y validaciones
        if ( !await VideoSchema.findById( data.video ) ) 
            throw createError({ statusCode: 400, statusMessage: 'No se ha encontrado un video con el id proporcionado.' })
        
        // Aumentar el contador de descargas de documento de calificación
        const video = await VideoSchema.findById( data.video )

        video.adicional.downloadDocCount = video.adicional.downloadDocCount + 1
        
        // Guardar el conjunto actualizado
        await video.save()

        return video
    }
    catch (error) {
        throw createError({statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
})