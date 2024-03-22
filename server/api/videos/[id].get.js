export default defineEventHandler((event) => {
    // Verificar que tenga el prefijo "MXIM-AV-3" seguido de guiones y números
    const isValid = /^MXIM-AV-3(-\d+)*$/.test(event.context.params.id)
    
    if (!isValid) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID en formato incorrecto',
        })
    }
    return `Información del registro con ID ${event.context.params.id}`
})