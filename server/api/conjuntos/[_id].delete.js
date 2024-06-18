/**
 * Borrar un registro de video de la base de datos
 */
export default defineEventHandler(async (event) => {
    // Parámetros URL: userId
    const query = getQuery(event)
    const userId = query?.id ? query.id : ''

    // Buscar si el registro tiene archivos asociados que deben borrarse
    try {
        const conjunto = await ConjuntoSchema.findOne({ _id: event.context.params._id })
        // Revisar que el conjunto sea vacío
        if(conjunto.adicional?.child?.length !== 0 && conjunto.adicional?.videos?.length !== 0)
            throw createError({statusCode: 400, statusMessage: 'Conjunto no vacío.'})

        // Borrar archivos usando DELETE /api/files/[...filepath]
        if(conjunto.adicional){
            const dirPath = 'public/data'
            // Imagen
            if(conjunto.adicional.imagen)
                try{
                    $fetch(`/api/files/${dirPath}/image/${conjunto.adicional.imagen}`, {method: 'DELETE'})
                }
                catch(error){
                    throw createError({statusCode: 500, statusMessage: 'Cannot delete file', message: error})
                }
        }
    } catch (error) {
        throw createError({statusCode: 400, statusMessage: 'Invalid id', message: error})
    }

    // Buscar y borrar video en base de datos
    try {
        const deletedConjunto = await ConjuntoSchema.findByIdAndDelete(event.context.params._id)
        // Borrar referencia de la lista de conjuntos del usuario
        if(userId)
            await UsuarioSchema.findByIdAndUpdate(
                userId,
                { $pull: { conjuntos: deletedConjunto._id} },
                { timestamps: false }
            )
        return deletedConjunto
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB delete error', message: error })
    }
})