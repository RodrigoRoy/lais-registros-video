/**
 * Elimina la referencia de un registro de video a la lista de marcadores del ususario
 * @param {object} event.body Representa el registro de video
 */
export default defineEventHandler(async (event) => {
    const video = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!video) throw createError({ statusCode: 400, statusMessage: 'Empty body', })

    // Actualizar lista de marcadores del usuario
    try {
        const updatedUser = await UsuarioSchema.findByIdAndUpdate(
            event.context.params._id, 
            { $pull: { bookmarks: video._id } }, 
            { new: true}, 
        )
        const updatedVideo = await VideoSchema.findByIdAndUpdate(
            video._id,
            { $pull: { 'adicional.bookmarkedBy': event.context.params._id } },
            { new: true},
        )
        return { user: updatedUser, video: updatedVideo }
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB error', message: error })
    }
})