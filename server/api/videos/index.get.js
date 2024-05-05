/**
 * Obtiene todos los registros de video.
 * Se excluyen aquellos marcados como "no públicos" y como borradores
 */
export default defineEventHandler( async (event) => {
    try {
        return await VideoSchema.find({ 'adicional.isPublic': true, 'adicional.isDraft': false})
    }
    catch (error) {
        return error
    }
})