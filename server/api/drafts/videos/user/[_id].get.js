/**
 * Obtiene la lista de borradores de un usuario
 */
export default defineEventHandler(async (event) => {
    // Buscar usuario y poblar su lista de borradores
    try {
        const user = await UsuarioSchema.
            findById(event.context.params?._id).
            populate('drafts').
            select('drafts').
            exec()
        return user.drafts
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB error', message: error })
    }
})