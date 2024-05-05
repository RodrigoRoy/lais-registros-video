/**
 * Elimina la referencia de un registro de video a la lista de borradores del ususario
 * @param {object} event.body Representa el registro de video
 */
export default defineEventHandler(async (event) => {
    const video = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!video) throw createError({ statusCode: 400, statusMessage: 'Empty body', })

    // Actualizar lista de borradores del usuario
    try {
        return await UsuarioSchema.findByIdAndUpdate(
            event.context.params._id, 
            { $pull: { drafts: video._id } }, 
            { new: true}
        )
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB error', message: error })
    }
})