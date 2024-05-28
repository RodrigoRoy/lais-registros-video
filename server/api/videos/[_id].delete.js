/**
 * Borrar un registro de video de la base de datos
 */
export default defineEventHandler(async (event) => {
    // Buscar si el registro tiene archivos asociados que deben borrarse
    try {
        const video = await VideoSchema.findOne({ _id: event.context.params._id })
        // Borrar archivos usando DELETE /api/files/[...filepath]
        if(video.adicional){
            const dirPath = 'public/data'
            // Imagen
            if(video.adicional.imagen)
                try{
                    $fetch(`/api/files/${dirPath}/image/${video.adicional.imagen}`, {method: 'DELETE'})
                }
                catch(error){
                    throw createError({statusCode: 500, statusMessage: 'Cannot delete file', message: error})
                }
            // Documento de calificación
            if(video.adicional.documentoCalificacion)
                try{
                    $fetch(`/api/files/${dirPath}/document/${video.adicional.documentoCalificacion}`, {method: 'DELETE'})
                }
                catch(error){
                    throw createError({statusCode: 500, statusMessage: 'Cannot delete file', message: error})
                }
            // Archivo de video
            if(video.adicional.clipVideo)
                try{
                    $fetch(`/api/files/${dirPath}/video/${video.adicional.clipVideo}`, {method: 'DELETE'})
                }
                catch(error){
                    throw createError({statusCode: 500, statusMessage: 'Cannot delete file', message: error})
                }
        }
    } catch (error) {
        throw createError({statusCode: 400, statusMessage: 'Invalid id', message: error})
    }

    // Buscar y borrar video en base de datos
    try {
        return await VideoSchema.findByIdAndDelete(event.context.params._id)
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB delete error', message: error })
    }
})