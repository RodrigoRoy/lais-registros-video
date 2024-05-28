/**
 * Obtiene todos los registros de video.
 * Se excluyen aquellos marcados como "no públicos" y como borradores
 */
export default defineEventHandler( async (event) => {
    try {
        return await ConjuntoSchema.find({ 'adicional.isPublic': true, 'adicional.isDraft': false})
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})