/**
 * Obtener la información de un usuario
 * @param {boolean} drafts Determina si la lista de borradores se le aplica populate()
 * @param {boolean} bookmarks Determina si la lista de marcadores se le aplica populate()
 */
export default defineEventHandler(async (event) => {

    // Parámetros URL: videos, review
    const query = getQuery(event)
    const populateVideos = query?.videos && query.videos === 'true' ? true : false
    const populateReview = query?.review && query.review === 'true' ? true : false

    // Buscar en base de datos
    try {
        const mongooseQuery = UsuarioSchema.find({})

        if(populateVideos)
            mongooseQuery.populate('videos')
        if(populateReview)
            mongooseQuery.populate('review')

        return await mongooseQuery.exec()
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})