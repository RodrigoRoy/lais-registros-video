import * as fs from 'fs' // Biblioteca de Node para editar y mover archivos

/**
 * Borrar un archivo del sistema de archivos.
 * No se permite borrar directorios/carpetas o enlaces simbólicos/accesos directos.
 */
export default defineEventHandler((event) => {
    // Verificar que exista la ruta del archivo
    if(fs.existsSync(event.context.params.filepath)){
        const stats = fs.statSync(event.context.params.filepath)
        // Verificar que el elemento a borrar realmente sea un archivo
        if(stats.isFile()){
            try {
                // Borrar el archivo
                fs.unlinkSync(event.context.params.filepath)
            } catch (error) {
                throw createError({statusCode: 500, statusMessage: 'Deleting file error', message: error})
            }
            // Reportar el archivo y el tamaño del archivo (en bytes)
            return {filepath: event.context.params.filepath, size: stats.size}
        }
        throw createError({statusCode: 404, statusMessage: 'Path is not a file', message: 'Deleting directories or symbolic links is not permited.'})
    }
    throw createError({statusCode: 404, statusMessage: 'Invalid filepath', message: 'The provided filepath does not exists.'})
})