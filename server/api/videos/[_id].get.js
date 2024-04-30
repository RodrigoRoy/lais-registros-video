export default defineEventHandler(async (event) => {
    // Buscar en base de datos
    try {
        return await VideoSchema.findOne({ _id: event.context.params?._id }).
            populate('controlDescripcion.documentalista', 'fullname'). // incluir el nombre de la persona documentalista
            exec()
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})