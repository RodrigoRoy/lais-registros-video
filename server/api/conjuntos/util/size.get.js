/**
 * @file server/api/conjuntos/util/size.get.js
 * @description Cantidad total de conjuntos
 * @returns {object.size} - La cantidad total de conjuntos.
 */

export default defineEventHandler(async(event) => {
    try {
        return await ConjuntoSchema.find({}).countDocuments({})
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error.statusMessage, message: error.message })
    }
})