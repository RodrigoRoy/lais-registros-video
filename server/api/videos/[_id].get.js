export default defineEventHandler(async (event) => {
    // Buscar en base de datos
    try {
        return await VideoSchema.findByIdAndUpdate(
                event.context.params?._id, 
                {$inc: { 'adicional.fetchCount': 1}}, // incremento del contador
                {new: true, timestamps: false} // timestamps: false - evita actualizar updatedAt
            ).
            populate('controlDescripcion.documentalista', 'fullname'). // incluir el nombre de la persona documentalista
            exec()
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})