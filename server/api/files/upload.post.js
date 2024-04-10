import formidable from 'formidable' // Biblioteca para procesamiento y subida de archivos

export default defineEventHandler(async (event) => {
    // Crear instancia para parsing de datos del formulario
    const form = formidable({
        defaultInvalidName: 'invalid',
        uploadDir: 'uploads',
        keepExtensions: true,
        createDirsFromUploads: true,
        allowEmptyFiles: false,
        minFileSize: 0,
    })

    // Los campos definidos en el cliente (FormData)
    // Deben incluir campos auxiliares como: "filetype" y "codigoReferencia"
    let fields
    
    // Los metadatos de los archivos que se desean alojar en el sistema de archivos
    // Representa un listado, pero solamente se procesa un archivo
    let files

    // FormData => variables con metadatos
    try {
        [fields, files] = await form.parse(event.node.req)
    }
    catch(err){
        throw createError({ statusCode: 400, statusMessage: err })
    }

    // Notificar que la subida de archivos fue correcta
    return JSON.stringify(files[0])
})