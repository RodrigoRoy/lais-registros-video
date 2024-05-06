/**
 * Obtiene la lista de marcadores de un usuario
 */
export default defineEventHandler(async (event) => {
    // Buscar usuario y poblar su lista de marcadores
    try {
        const user = await UsuarioSchema.
            findById(event.context.params?._id).
            populate('bookmarks').
            select('bookmarks').
            exec()
        return user.bookmarks
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB error', message: error })
    }
})