/**
 * Aumenta el contador de pdf del documento
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
        const video = await VideoSchema.findByIdAndUpdate(
            data.video,
            { "adicional.downloadPdfCount": data.video.adicional.downloadPdfCount++ },
            { new: true, timestamps: false }
        )
        
        return video
    }
    catch (error) {
        throw createError({statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
})