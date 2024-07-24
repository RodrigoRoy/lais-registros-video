/**
 * Obtiene los conjuntos y/o unidades documentales (videos)
 * Se excluyen aquellos marcados como "no públicos"
 */
export default defineEventHandler( async (event) => {
    // Parámetros URL: id, disable, type
    const query = getQuery(event)
    const id = query?.id // id del conjunto (o video)
    const disableLast = query?.disable === 'true' // deshabilita el último elemento de la lista
    const type = query?.type // valor esperado: "video"

    // Lista con formato para breadcrumbs de vuetify
    const items = []
    // Agregar navegación inicial
    items.push( { title: "Inicio", disabled: false, href: '/'} )
      
    try {
        if(id){
            // Buscar conjunto (o video) por id. En caso de ser video, se reutiliza la variable "conjunto"
            let conjunto
            if(type === 'video')
                conjunto = await VideoSchema.findById(id).select('identificacion.codigoReferencia adicional.parent').lean()
            else
                conjunto = await ConjuntoSchema.findById(id).select('identificacion.titulo adicional.parent').lean()
    
            // Verificar existencia en base de datos
            if(!conjunto)
                throw createError({statusCode: 400, statusMessage: 'Invalid Id', message: "Couldn't find data with the requested id"})
    
            // Agregar titulo y href a la lista siempre en el índice 1 para "revertir" el orden
            if(type === 'video')
                items.splice(1, 0, { title: conjunto.identificacion.codigoReferencia, disabled: false, href: `/videos/${conjunto._id}`} )
            else
                items.splice(1, 0, { title: conjunto.identificacion.titulo, disabled: false, href: `/nav?id=${conjunto._id}`} )
    
            // Iterar hasta la raiz con el mismo procedimiento
            while (conjunto && conjunto.adicional.parent) {
                conjunto = await ConjuntoSchema.findById(conjunto.adicional.parent).select('identificacion.titulo adicional.parent').lean()
                items.splice(1, 0, { title: conjunto.identificacion.titulo, disabled: false, href: `/nav?id=${conjunto._id}`} )
            }
    
            // En caso de ser necesario, deshabilitar el último elemento
            if(disableLast)
                items[items.length - 1].disabled = true
            return items
        } 
        
        // Buscar conjunto raíz (adicional.parent es null)
        else {
            const conjunto = await ConjuntoSchema.findOne({ 'adicional.parent': null, 'adicional.isPublic': true }).populate('adicional.child').populate('adicional.videos').exec()
            if(!conjunto)
                throw createError({statusCode: 400, statusMessage: 'Invalid Id', message: "Couldn't find data with the requested id"})
    
            // Agregar titulo y href a la lista siempre en el índice 1 para "revertir" el orden
            items.splice(1, 0, { title: conjunto.identificacion.titulo, disabled: true, href: `/nav?id=${conjunto._id}`} )
            return items
        }
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})