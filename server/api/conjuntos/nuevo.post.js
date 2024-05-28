export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    // Guardar en base de datos
    try{
        return await new ConjuntoSchema(body).save()
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})