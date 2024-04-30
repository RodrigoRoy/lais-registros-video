export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body', })

    // Actualizar información en base de datos
    try {
        return await VideoSchema.findOneAndUpdate(
            // filter
            { _id: event.context.params._id}, 
            // update
            body, 
            // options
            { new: true} // return document AFTER update was applied
        )
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})