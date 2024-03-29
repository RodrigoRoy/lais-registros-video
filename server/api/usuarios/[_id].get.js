export default defineEventHandler(async (event) => {
    // Verificar que el _id sea una representación de 12 bytes
    const isValidId = /^[a-f0-9]{24}$/.test(event.context.params._id)
    if(!isValidId) throw createError({ statusCode: 400, statusMessage: 'ID inválido'})

    // Buscar en base de datos
    try {
        return await UsuarioSchema.findOne({ _id: event.context.params?._id })
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})