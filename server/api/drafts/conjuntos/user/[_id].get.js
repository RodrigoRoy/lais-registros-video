/**
 * Obtiene la lista de borradores (conjuntos) de un usuario
 */
export default defineEventHandler(async (event) => {
    // Buscar usuario y poblar su lista de borradores
    try {
        const user = await UsuarioSchema.
            findById(event.context.params?._id).
            populate('draftsConjuntos').
            select('draftsConjuntos').
            exec()
        return user.draftsConjuntos
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB error', message: error })
    }
})