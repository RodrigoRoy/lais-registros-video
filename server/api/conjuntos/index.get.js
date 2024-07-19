/**
 * Obtiene todos los conjuntos documentales.
 * Se excluyen aquellos marcados como "no públicos"
 */
export default defineEventHandler( async (event) => {
    try {
        return await ConjuntoSchema.find({ 'adicional.isPublic': true })
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})