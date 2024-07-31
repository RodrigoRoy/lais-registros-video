/**
 * Búsqueda textual en base de datos
 * @param {string} req.query.q Texto de búsqueda
 * @return {Object} Listas de resultados de videos (object.videos) y conjuntos (object.conjuntos)
 */
export default defineEventHandler( async (event) => {
    const query = getQuery(event)
    const searchQuery = query?.q ? query.q : ''

    try {
        const videosResult = await VideoSchema.find({$text: {$search: searchQuery}}, {score: {$meta: "textScore"}}).sort({score: { $meta: "textScore" }})
        const conjuntosResult = await ConjuntoSchema.find({$text: {$search: searchQuery}}, {score: {$meta: "textScore"}}).sort({score: { $meta: "textScore" }})
        return { videos: videosResult, conjuntos: conjuntosResult}
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})