import { Types } from 'mongoose'

export default defineEventHandler(async (event) => {
    // Buscar en base de datos y poblar datos de usuario (populate)
    try {
        const videos = await VideoSchema.
            find().
            populate({
                path: 'controlDescripcion.documentalista',
                // match filtrará usuarios, no videos
                // si no hay match, documentalista será null
                match: { _id: event.context.params._id},
                select: 'fullname',
            }).
            select('-condicionesAccesoUso -documentacionAsociada -notas').
            exec()
        // filtrar aquellos documentos/objects donde documentalitas no es null
        return videos.filter((video) => video.controlDescripcion.documentalista != null)
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: error })
    }
})