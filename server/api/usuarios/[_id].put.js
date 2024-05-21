export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body', })

    // Actualizar información en base de datos
    try {
        return await UsuarioSchema.findByIdAndUpdate(
            event.context.params._id,
            { $set: 
                {
                    name: body.name,
                    fullname: body.fullname,
                    email: body.email,
                    operation: body.operation,
                    admin: body.admin,
                    active: body.active,
                }
            },
            { new: true}
        )
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})