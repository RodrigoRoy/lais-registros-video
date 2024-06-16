/**
 * Obtener la información de un usuario
 * @param {boolean} drafts Determina si la lista de borradores se le aplica populate()
 * @param {boolean} bookmarks Determina si la lista de marcadores se le aplica populate()
 */
export default defineEventHandler(async (event) => {
    // Verificar que el _id sea una representación de 12 bytes
    const isValidId = /^[a-f0-9]{24}$/.test(event.context.params._id)
    if(!isValidId) throw createError({ statusCode: 400, statusMessage: 'ID inválido'})

    // Parámetros URL: drafts, bookmarks
    const query = getQuery(event)
    const populateDrafts = query?.drafts && query.drafts === 'true' ? true : false
    const populateBookmarks = query?.bookmarks && query.bookmarks === 'true' ? true : false
    const populateVideos = query?.videos && query.videos === 'true' ? true : false

    // Buscar en base de datos
    try {
        const mongooseQuery = UsuarioSchema.findById(event.context.params?._id)
        if(populateDrafts)
            mongooseQuery.populate('drafts')
        if(populateBookmarks)
            mongooseQuery.populate('bookmarks')
        if(populateVideos)
            mongooseQuery.populate('videos')

        return await mongooseQuery.exec()
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})