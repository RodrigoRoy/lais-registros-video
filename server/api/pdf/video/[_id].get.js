import PdfPrinter from 'pdfmake'
import * as fs from 'fs' // Biblioteca de Node para editar y mover archivos

export default defineEventHandler(async (event) => {
    // Verificar que el _id sea una representación de 12 bytes
    const isValidId = /^[a-f0-9]{24}$/.test(event.context.params._id)
    if(!isValidId) throw createError({ statusCode: 400, statusMessage: 'ID inválido'})

    const videoData = await VideoSchema.findById(event.context.params?._id)

    const fonts = {
        Roboto: {
            normal: 'public/fonts/Roboto-Regular.ttf',
            bold: 'public/fonts/Roboto-Medium.ttf',
            italics: 'public/fonts/Roboto-Italic.ttf',
            bolditalics: 'public/fonts/Roboto-MediumItalic.ttf',
        }
    }
    const printer = new PdfPrinter(fonts)
    const docDefinition = {
        content: [
            { text: 'This is a test for the library pdfmake.'},
            { text: 'Serving from the Nuxt server, Nitro.'},
            { text: `The request video data is from ${videoData.identificacion?.codigoReferencia}`},
        ]
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(fs.createWriteStream(`public/data/pdf/${videoData.identificacion?.codigoReferencia}.pdf`))
    pdfDoc.end()

    return pdfDoc
})