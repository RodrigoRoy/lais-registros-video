export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Empty body',
        })
    }
    return { message: `Registo de video con ID "${body.id}" procesado correctamente`}
})