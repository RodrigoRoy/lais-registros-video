/**
 * Obtiene los conjuntos y/o unidades documentales (videos)
 * Se excluyen aquellos marcados como "no públicos"
 */
export default defineEventHandler( async (event) => {
    // Parámetros URL: id (conjunto de origen)
    const query = getQuery(event)
    const id = query?.id

    try {
        if(id){
            // Buscar conjunto y poblar sus elementos asociados
            return await ConjuntoSchema.findById(id).where('adicional.isPublic', true).populate('adicional.child').populate('adicional.videos').exec()
        }
        // Buscar conjunto raiz y poblar sus elementos asociados
        return await ConjuntoSchema.findOne({ 'adicional.parent': null, 'adicional.isPublic': true }).populate('adicional.child').populate('adicional.videos').exec()
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})