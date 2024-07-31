/**
 * Búsqueda textual en base de datos
 * @param {string} req.query.q Texto de búsqueda
 */
export default defineEventHandler( async (event) => {
    const query = getQuery(event)
    const searchQuery = query?.q ? query.q : ''

    try {
        return await VideoSchema.find({$text: {$search: searchQuery}}, {score: {$meta: "textScore"}})
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})