/**
 * Devuelve sugerencias para un nuevo código de referencia con numeración consecutiva.
 * @returns {object.first} Código de referencia sugerido con numeración iniciada desde 1
 * @returns {object.middle} Código de referencia sugerido con numeración iniciada en el primer valor del rango actual
 * @returns {object.last} Código de referencia sugerido con numeración en el último valor encontrado del rango actual
 * Ejemplo. Suponiendo que la numeración encontrada fue: 67, 68, 70, 71, 72, 73, 74, 75, el resultado será:
 * { "first": "MXIM-AV-3-9-1", "middle": "MXIM-AV-3-9-69", "last": "MXIM-AV-3-9-76" }
 * Significa que la primer sugerencia intenta no dejar ningún hueco en la numeración y sugiere numerar desde 1,
 * la siguiente sugerencia indica que del rango encontrado se dejó un hueco en el valor 69,
 * y la última sugerencia indica que se continue la numeración hacia el último valor que sería 76.
 */
export default defineEventHandler(async(event) => {
    try {
        // Buscar conjunto de origen
        const conjunto = await ConjuntoSchema.findById(event.context.params?._id).select('identificacion.codigoReferencia').exec()
        
        // Obtener la lista de videos con el mismo prefijo
        const regexCodigoOrigen = new RegExp(`^${conjunto.identificacion.codigoReferencia}`)
        const videos = await VideoSchema.find({'identificacion.codigoReferencia': regexCodigoOrigen}).select('identificacion.codigoReferencia').exec()

        // Si el conjunto está vacio, sugerir numeración comenzando con el valor 1
        if(videos.length === 0)
            return {first: `${conjunto.identificacion.codigoReferencia}-1`, middle: `${conjunto.identificacion.codigoReferencia}-1`, last: `${conjunto.identificacion.codigoReferencia}-1`}
        
        // Obtener la numeración consecutiva (solamente los últimos dígitos del código de referencia) en orden ascendente
        const regexNumeracion = new RegExp(`${conjunto.identificacion.codigoReferencia}-(\\d+)`)
        const numeracion = videos.map((video) => parseInt(regexNumeracion.exec(video.identificacion.codigoReferencia)[1])).sort((a,b) => a-b)

        // Determinar la primer sugerencia, es decir, el primer número consecutivo iniciando desde el valor 1
        let first = 1
        let i = 0
        while(i < numeracion.length && first == numeracion[i]){
            first++
            i++
        }

        // Determinar la sugerencia media, es decir, el primer número consecutivo tomando como rango la numeración actual
        let middle = numeracion[0]
        i = 0
        while(i < numeracion.length && middle == numeracion[i]){
            middle++
            i++
        }

        // Determinar la última sugerencia, es decir, el número que da continuidad a la numeración actual
        const last = numeracion[numeracion.length-1]+1

        // Responder con ambas recomendaciones
        return {first: `${conjunto.identificacion.codigoReferencia}-${first}`, middle: `${conjunto.identificacion.codigoReferencia}-${middle}`, last: `${conjunto.identificacion.codigoReferencia}-${last}`}
    }
    catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})