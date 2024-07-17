/**
 * Obtiene la lista de todos los registros de video marcados como borradores
 */
export default defineEventHandler( async (event) => {
    try {
        return await VideoSchema.find({ 'adicional.isDraft': true })
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'DB error', message: error})
    }
})