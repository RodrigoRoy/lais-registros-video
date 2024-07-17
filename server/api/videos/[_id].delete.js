/**
 * Borrar un registro de video de la base de datos
 */
export default defineEventHandler(async (event) => {
    // Parámetros URL: userId
    const query = getQuery(event)
    const userId = query?.id ? query.id : ''

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
        const deletedVideo = await VideoSchema.findByIdAndDelete(event.context.params._id)
        
        if(userId){
            // Borrar referencia de la lista de videos del usuario
            await UsuarioSchema.findByIdAndUpdate(
                userId,
                { $pull: { videos: deletedVideo._id} },
                { timestamps: false }
            )
            // Borrar referencia de la lista de borradores (drafts) del usuario
            await UsuarioSchema.findByIdAndUpdate(
                userId,
                { $pull: { drafts: deletedVideo._id} },
                { timestamps: false }
            )
        }
        
        return deletedVideo
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB delete error', message: error })
    }
})