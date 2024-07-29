/**
 * Agrega una referencia como hijo del conjunto.
 * @param {string} query.id Id del video o conjunto hijo
 * @param {string} query.type Video o conjunto 
 */
export default defineEventHandler( async (event) => {
    const query = getQuery(event)
    const id = query?.id
    const type = query?.type

    try {
        if(id){
            if(type === "conjunto"){
                return await ConjuntoSchema.findByIdAndUpdate(
                    event.context.params._id, 
                    { $pull: { "adicional.child" : id } }, 
                    { new: true, timestamps: false }
                )
            }
            else {
                // Por default, caso para video
                return await ConjuntoSchema.findByIdAndUpdate(
                    event.context.params._id, 
                    { $pull: { "adicional.videos" : id } }, 
                    { new: true, timestamps: false }
                )
            }
        } else
            throw createError({statusCode: 400, statusMessage: 'Id es necesario', message: 'Id no ha sido enviado como un parámetro del query.'})
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})