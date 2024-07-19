/**
 * Obtiene todos los registros de video.
 * Se excluyen aquellos marcados como "no públicos"
 */
export default defineEventHandler( async (event) => {
    try {
        return await VideoSchema.find({ 'adicional.isPublic': true })
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})