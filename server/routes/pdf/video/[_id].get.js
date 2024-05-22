import PdfPrinter from 'pdfmake'
import * as fs from 'fs' // Biblioteca de Node para editar y mover archivos
import format from '~/utils/format'

/**
 * Determina si un área/propiedad de la unidad documental está vacía
 * @param {Object} area Objecto que representa el conjunto de propiedades del área por verificar
 * @returns {boolean} True si todas las propiedades del área son vacias, falso en otro caso
 */
function isAreaEmpty(area){
    return !Object.values(area).every(x => x === null || x === 0 || !!x)
}

/**
 * Convierte una sección de la unidad documental (en video) a un arreglo de texto
 * compatible para una tabla en formato de pdfmake.
 * @param {string} areaName Nombre del área/propiedad que se desea convertir
 * @param {Object} video Esquema de la base de datos para la unidad documental (video)
 * @returns {Array} Tabla de valores compatible con el formato de pdfmake
 */
function area2bodytable(areaName, video){
    let parsedFields = []

    switch(areaName){
        case 'identificacion':
            if(video.identificacion.codigoReferencia) parsedFields.push([format('codigoReferencia'), video.identificacion.codigoReferencia])
            if(video.identificacion.fecha) parsedFields.push([format('fecha'), video.identificacion.fecha])
            if(video.identificacion.lugar) parsedFields.push([format('lugar'), video.identificacion.lugar])
            if(video.identificacion.pais) parsedFields.push([format('pais'), video.identificacion.pais])
            if(video.identificacion.duracion) parsedFields.push([format('duracion'), video.identificacion.duracion])
            if(video.identificacion.personasEntrevistadas) parsedFields.push([format('personasEntrevistadas'), video.identificacion.personasEntrevistadas])
            if(video.identificacion.entrevista) parsedFields.push([format('entrevista'), video.identificacion.entrevista])
            if(video.identificacion.camara) parsedFields.push([format('camara'), video.identificacion.camara])
            if(video.identificacion.iluminacion) parsedFields.push([format('iluminacion'), video.identificacion.iluminacion])
            if(video.identificacion.asistencia) parsedFields.push([format('asistencia'), video.identificacion.asistencia])
            if(video.identificacion.sonido) parsedFields.push([format('sonido'), video.identificacion.sonido])
            break
        case 'contenidoEstructura':
            if(video.contenidoEstructura.descripcionGeneral) parsedFields.push([format('descripcionGeneral'), video.contenidoEstructura.descripcionGeneral])
            if(video.contenidoEstructura.estructuraFormal) parsedFields.push([format('estructuraFormal'), video.contenidoEstructura.estructuraFormal])
            if(video.contenidoEstructura.descriptorOnomastico) parsedFields.push([format('descriptorOnomastico'), video.contenidoEstructura.descriptorOnomastico])
            if(video.contenidoEstructura.descriptorToponimico) parsedFields.push([format('descriptorToponimico'), video.contenidoEstructura.descriptorToponimico])
            break
        case 'condicionesAccesoUso':
            if(video.condicionesAccesoUso.idiomaOriginal) parsedFields.push([format('idiomaOriginal'), video.condicionesAccesoUso.idiomaOriginal])
            if(video.condicionesAccesoUso.soporte) parsedFields.push([format('soporte'), video.condicionesAccesoUso.soporte])
            if(video.condicionesAccesoUso.numeroCasetes) parsedFields.push([format('numeroCasetes'), video.condicionesAccesoUso.numeroCasetes])
            if(video.condicionesAccesoUso.color) parsedFields.push([format('color'), video.condicionesAccesoUso.color])
            if(video.condicionesAccesoUso.audio) parsedFields.push([format('audio'), video.condicionesAccesoUso.audio])
            if(video.condicionesAccesoUso.sistemaGrabacion) parsedFields.push([format('sistemaGrabacion'), video.condicionesAccesoUso.sistemaGrabacion])
            if(video.condicionesAccesoUso.resolucionGrabacion) parsedFields.push([format('resolucionGrabacion'), video.condicionesAccesoUso.resolucionGrabacion])
            if(video.condicionesAccesoUso.formatoVideoDigital) parsedFields.push([format('formatoVideoDigital'), video.condicionesAccesoUso.formatoVideoDigital])
            if(video.condicionesAccesoUso.requisitosTecnicos) parsedFields.push([format('requisitosTecnicos'), video.condicionesAccesoUso.requisitosTecnicos])
            break
        case 'documentacionAsociada':
            if(video.documentacionAsociada.unidadesDescripcionRelacionadas) parsedFields.push([format('unidadesDescripcionRelacionadas'), video.documentacionAsociada.unidadesDescripcionRelacionadas])
            if(video.documentacionAsociada.documentosAsociados) parsedFields.push([format('documentosAsociados'), video.documentacionAsociada.documentosAsociados])
            break
        case 'notas':
            if(video.notas.notas) parsedFields.push([format('notas'), video.notas.notas])
            break
        case 'controlDescripcion':
            if(video.controlDescripcion.documentalista) parsedFields.push([format('documentalista'), video.controlDescripcion.documentalista])
            parsedFields.push([format('createdAt'), video.createdAt])
            parsedFields.push([format('updatedAt'), video.updatedAt])
            break
    }

    return parsedFields
}

export default defineEventHandler(async (event) => {
    // Verificar que el _id sea una representación de 12 bytes
    const isValidId = /^[a-f0-9]{24}$/.test(event.context.params._id)
    if(!isValidId) throw createError({ statusCode: 400, statusMessage: 'ID inválido'})

    // Información en base de datos
    const video = await VideoSchema.findById(event.context.params?._id)

    // Fuentes tipográficas disponibles para el texto
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
        // Estilos para reusar durante la definición del documento
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            table: {
                margin: [0, 5, 0, 15]
            },
        },
        // Encabezado (código de referencia)
        header: { text: `${video.identificacion.codigoReferencia}`, fontSize: 10, italics: true, alignment: 'right', margin: [25, 25, 50, 50]},
        // Pie de página (cantidad de páginas)
        footer: function(currentPage, pageCount) { 
            return {
                style: 'table',
                table: {
                    widths: [28, '*', 50, 28],
                    body: [
                        [
                            '',
                            {text: 'Laboratorio Audiovisual de Investigación Social. Instituto Mora.', fontSize: 10, italics: true, alignment: 'left'},
                            {text: currentPage.toString() + ' de ' + pageCount, italics: true, alignment: 'right'},
                            ''
                        ]
                    ]
                },
                layout: 'noBorders'
            }
        },
        // Definición del documento
        content: [
            {image: 'public/LogoLAIS.png', fit: [110, 40], alignment: 'right'},
            {text: 'Ficha de catalogación', style: 'header'},
            {text: 'Catalogación del fondo de registros en video del Laboratorio Audiovisual de Investigación Social del Instituto Mora.'},

            // Área de identificación
            isAreaEmpty(video.identificacion) ? '' : {text: 'Área de identificación', style: 'subheader'},
            isAreaEmpty(video.identificacion) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('identificacion', video)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de contenido y estructura
            isAreaEmpty(video.contenidoEstructura) ? '' : {text: 'Área de contenido y estructura', style: 'subheader'},
            isAreaEmpty(video.contenidoEstructura) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('contenidoEstructura', video)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de condiciones de acceso y uso
            isAreaEmpty(video.condicionesAccesoUso) ? '' : {text: 'Área de condiciones de acceso y uso', style: 'subheader'},
            isAreaEmpty(video.condicionesAccesoUso) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('condicionesAccesoUso', video)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de documentación asociada
            isAreaEmpty(video.documentacionAsociada) ? '' : {text: 'Área de documentación asociada', style: 'subheader'},
            isAreaEmpty(video.documentacionAsociada) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('documentacionAsociada', video)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de notas
            isAreaEmpty(video.notas) ? '' : {text: 'Área de notas', style: 'subheader'},
            isAreaEmpty(video.notas) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('notas', video)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de control de la descripción
            isAreaEmpty(video.controlDescripcion) ? '' : {text: 'Área de control de la descripción', style: 'subheader'},
            isAreaEmpty(video.controlDescripcion) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('controlDescripcion', video)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },
        ],
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(fs.createWriteStream(`public/data/pdf/${video.identificacion?.codigoReferencia}.pdf`))
    pdfDoc.end()

    return pdfDoc
})