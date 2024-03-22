export default defineEventHandler(async (event) => {
    // Buscar y borrar en base de datos
    try {
        return await UsuarioSchema.findOneAndDelete({ _id: event.context.params._id })
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})