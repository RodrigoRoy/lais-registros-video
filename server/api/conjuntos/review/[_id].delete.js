/**
 * Remueve referencia de un usuario revisor a un conjunto documental
 * @param {string} params._id Id del conjunto
 * @param {string} query.user Id del usuario revisor
 */
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const conjuntoId = event.context.params._id
    const usuarioId = query.u

    if(!usuarioId)
        throw createError({statusCode: 400, statusMessage: 'Invalid user id', message: 'User id is necessary to assign reviewer'})

    try {
        // Quita referencia del conjunto en el usuario
        await UsuarioSchema.findByIdAndUpdate(
            usuarioId, 
            { $pull: { 'review': conjuntoId } },
            { timestamps: false }
        )

        // Quita referencia del usuario en la lista de revisores del conjunto
        return await ConjuntoSchema.findByIdAndUpdate(
            conjuntoId, 
            { $pull: { "adicional.review" : usuarioId } },
            { new: true, timestamps: false }
        )
    }
    catch (error) {
        throw createError({statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
})