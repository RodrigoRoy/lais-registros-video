import formidable from 'formidable' // Biblioteca para procesamiento y subida de archivos
import * as fs from 'fs' // Biblioteca de Node para editar y mover archivos

export default defineEventHandler(async (event) => {
    // Ubicación para almacenar archivos
    const uploadDir = 'public/data'
    // Mover el archivo de su ubicacion por default
    try {
        // Verificar que la ubicación exista, de lo contrario, crearla
        if(!fs.existsSync(uploadDir))
            fs.mkdirSync(uploadDir, {recursive: true})
    } catch (err) {
        throw createError({ statusCode: 400, statusMessage: 'Directory creation error', message: err })
    }
    
    // Crear instancia para parsing de datos del formulario
    const form = formidable({
        uploadDir: uploadDir,
        keepExtensions: true,
        allowEmptyFiles: false,
        maxFiles: 1,
        maxFileSize: 20 * 1024 * 1024, // 20 MB
        maxTotalFileSize: 20 * 1024 * 1024, // 20 MB
        maxFields: 3,
        maxFieldsSize: 5 * 1024 * 1024, // 5 MB
        defaultInvalidName: 'invalid',
        /**
         * Renombramiento del archivo para conservar su nombre original
         * @param {string} name Nombre original del archivo
         * @param {string} ext Extensión original del archivo, inlcuye punto(.)
         * @param {Object} part Incluye varios metadatos como originalFilename y mimetype
         * @param {Object} form Información del formulario, incluye metadatos como bytesReceived y bytesExpected
         * @returns {string} Nuevo nombre del archivo
         */
        filename: (name, ext, part, form) => {
            return part.originalFilename
        },
    })

    // Los campos definidos en el cliente (FormData)
    // Deben incluir campos auxiliares como: "filetype" y "codigoReferencia"
    let fields
    
    // Los metadatos de los archivos que se desean alojar en el sistema de archivos
    // Representa un listado, pero solamente se procesa un archivo
    let files

    // FormData a variables
    try {
        [fields, files] = await form.parse(event.node.req)
    }
    catch(err){
        throw createError({ statusCode: 500, statusMessage: 'Parse data error', message: err })
    }

    // Campos recibidos desde FormData:
    // fields.codigoReferencia[0]
    // fields.filetype[0]
    
    // Archivo recibido desde FormData y sus propiedades:
    // files.file[0]{ size, filepath, newFilename, mimetype, mtime, originalFilename }

    // Nueva ubicación para mover archivo (public/data/video, public/data/image, public/data/document)
    const newDirPath = fields.filetype ? `${uploadDir}/${fields.filetype[0]}` : uploadDir

    // Caracteres finales después del punto (.) final. Por ejemplo: pdf, mp4, jpg
    const fileExtension = files.file[0].originalFilename.match(/\.([^.]+)$/i)[1]

    // Ubicación original del archivo
    const oldPath = `${uploadDir}/${files.file[0].originalFilename}`
    // Nueva ubicación del archivo
    // const newPath = `${newDirPath}/${files.file[0].originalFilename}`
    const newPath = `${newDirPath}/${fields.codigoReferencia[0]}.${fileExtension}`

    // Mover el archivo de su ubicacion por default
    try {
        fs.renameSync(oldPath, newPath)
    } catch (err) {
        throw createError({ statusCode: 400, statusMessage: 'Rename file error', message: err })
    }

    // Notificar que la subida de archivos fue correcta
    return {filename: `${fields.codigoReferencia[0]}.${fileExtension}`}
})