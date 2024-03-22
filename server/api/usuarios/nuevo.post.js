export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    // TODO body validations

    // Guardar en base de datos
    try{
        return await new UsuarioSchema(body).save()
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error})
    }
})