export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body', })

    // TODO compare body

    // Actualizar información en base de datos
    try {
        return await UsuarioSchema.findOneAndUpdate({ _id: event.context.params._id}, body, { new: true})
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})