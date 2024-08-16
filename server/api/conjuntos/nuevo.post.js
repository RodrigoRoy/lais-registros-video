export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const query = getQuery(event)

    // Parámetros URL: userId
    const userId = query?.id ? query.id : ''

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    // Guardar en base de datos
    try{
        const newConjunto = await new ConjuntoSchema(body).save()

        if(userId)
            await UsuarioSchema.findByIdAndUpdate(
                userId,
                { $addToSet: { conjuntos: newConjunto._id} },
                { new: true, timestamps: false }
            )

        return newConjunto
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})