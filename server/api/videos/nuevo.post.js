export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const query = getQuery(event)

    // Parámetros URL: userId
    const userId = query?.id ? query.id : ''

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    // Guardar en base de datos
    try{
        // return await new VideoSchema(body).save()
        const newVideo = await new VideoSchema(body).save()
        if(userId)
            await UsuarioSchema.findByIdAndUpdate(
                userId,
                { $addToSet: { videos: newVideo._id} },
                { new: true, timestamps: false }
            )
        return newVideo
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})