/**
 * Agrega la referencia del conjunto documental a la lista de borradores (conjunto) del ususario
 * @param {object} event.body Representa el conjunto documental
 */
export default defineEventHandler(async (event) => {
    const conjunto = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!conjunto) throw createError({ statusCode: 400, statusMessage: 'Empty body', })

    // Actualizar lista de borradores del usuario
    try {
        return await UsuarioSchema.findByIdAndUpdate(
            event.context.params._id, 
            { $addToSet: { draftsConjuntos: conjunto._id } }, 
            { new: true, timestamps: false }
        )
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB error', message: error })
    }
})