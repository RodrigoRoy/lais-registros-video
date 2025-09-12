/**
 * Obtiene todos los conjuntos documentales.
 * Se excluyen aquellos marcados como "no públicos"
 */
export default defineEventHandler(async (event) => {

    // Parámetros URL: videos, review
    const query = getQuery(event)
    const populateVideos = query?.videos && query.videos === 'true' ? true : false
    const populateReview = query?.review && query.review === 'true' ? true : false

    // Buscar en base de datos
    try {
        const mongooseQuery = ConjuntoSchema.find({})

        if(populateVideos)
            mongooseQuery.populate({
                path: 'adicional.videos',
                match: { 'adicional.inReview': true }, // solo poblar los videos que esten en revisión
                populate: {
                    path: 'controlDescripcion.documentalista', // Este populate está dentro de los videos
                    model: 'Usuario'
                }
            })
        if(populateReview)
            mongooseQuery.populate('adicional.review')

        return await mongooseQuery.exec()
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})