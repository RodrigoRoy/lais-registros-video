<template>
    <!-- Imagen cargada pero oculta, necesaria para mostrar correctamente en PDF -->
    <img :src="`/data/image/${data.adicional.imagen}`" width="100%" height="auto" v-show="false" ref="image" id="image"></img>

    <v-btn class="text-none" :variant="variant" :block="block" :prepend-icon="icon" @click="showPDF(data)">Descargar PDF</v-btn>
</template>

<script setup>
defineProps({
    data: {type: Object, required: true},
    variant: {type: String, default: 'flat'},
    block: {type: Boolean, default: true},
    icon: {type: String, default: 'mdi-file-pdf-box'},
})

// import PdfPrinter from 'pdfmake'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

const dayjs = useDayjs()

// Auxiliares para mostrar imagen de referencia del video para PDF (pdfmake)
const image = ref()
const imageWidth = ref(0)
const imageHeight = ref(0)

// Obtener medidas originales de la imagen
// Es necesario esperar a que la imagen esté cargada
onMounted( () => {
    let img = new Image()
    img.onload = function(){
        imageWidth.value = img.width
        imageHeight.value = img.height
    }
    img.src = image.value?.src
})

/**
 * Conversión de una imagen a su formato Base64
 * @param {object} imageHTMLRef Elemento HTML que contiene la imagen. Idealmente un elemento <img>
 * @returns {string} La imagen en su representación Base64
 */
 function getBase64Img(imageHTMLRef){
    let canvas = document.createElement('canvas')
    canvas.width = imageWidth.value
    canvas.height = imageHeight.value
    let ctx = canvas.getContext('2d')
    ctx.drawImage(imageHTMLRef, 0, 0)
    return canvas.toDataURL('image/jpeg')
}

/**
 * Determina si un área/propiedad de la unidad documental está vacía
 * @param {string} areaString Nombre textual del área por verificar, tal como aparecen en el esquema de la BD
 * @param {Object} areaObject Objecto que representa el conjunto de propiedades del área por verificar
 * @returns {boolean} True si todas las propiedades del área son vacias, falso en otro caso
 */
 function isAreaEmpty(areaString, areaObject){
    switch(areaString){
        case 'identificacion':
            if(areaObject.codigoReferencia) return false
            if(areaObject.fecha) return false
            if(areaObject.lugar) return false
            if(areaObject.pais) return false
            if(areaObject.duracion) return false
            if(areaObject.personasEntrevistadas) return false
            if(areaObject.entrevista) return false
            if(areaObject.camara) return false
            if(areaObject.iluminacion) return false
            if(areaObject.asistencia) return false
            if(areaObject.sonido) return false
            return true
        case 'contenidoEstructura':
            if(areaObject.descripcionGeneral) return false
            if(areaObject.estructuraFormal) return false
            if(areaObject.descriptorOnomastico) return false
            if(areaObject.descriptorToponimico) return false
            return true
        case 'condicionesAccesoUso':
            if(areaObject.idiomaOriginal) return false
            if(areaObject.soporte) return false
            if(areaObject.numeroCasetes) return false
            if(areaObject.color) return false
            if(areaObject.audio) return false
            if(areaObject.sistemaGrabacion) return false
            if(areaObject.resolucionGrabacion) return false
            if(areaObject.formatoVideoDigital) return false
            if(areaObject.requisitosTecnicos) return false
            return true
        case 'documentacionAsociada':
            if(areaObject.unidadesDescripcionRelacionadas) return false
            if(areaObject.documentosAsociados) return false
            return true
        case 'notas':
            if(areaObject.notas) return false
            return true
        case 'controlDescripcion':
            if(areaObject.documentalista) return false
            return true
        default:
            return true
    }
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
            if(video.identificacion.fecha) parsedFields.push([format('fecha'), dayjs(video.identificacion.fecha).format('DD/MM/YYYY')])
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
            if(video.controlDescripcion.documentalista) parsedFields.push([format('documentalista'), video.controlDescripcion.documentalista.fullname])
            parsedFields.push([format('createdAt'), dayjs(video.createdAt).format('DD/MM/YYYY HH:mm')])
            parsedFields.push([format('updatedAt'), dayjs(video.updatedAt).format('DD/MM/YYYY HH:mm')])
            break
    }

    return parsedFields
}

/**
 * Acción para mostrar/descargar la documentación en formato PDF
 * @param {Object} video Esquema de la base de datos para la unidad documental (video)
 */
 function showPDF(video){
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

        // Imágenes codificas en formato Base64
        images: {
            lais: getLogosBase64()
        },
        
        // Encabezado (código de referencia)
        header: { text: `${video.identificacion.codigoReferencia}`, fontSize: 10, italics: true, alignment: 'right', margin: [25, 25, 50, 50], color: '#BDBDBD'},
        
        // Pie de página (cantidad de páginas)
        footer: function(currentPage, pageCount) { 
            return {
                style: 'table',
                table: {
                    widths: [28, '*', 50, 28],
                    body: [
                        [
                            '',
                            {text: 'Laboratorio Audiovisual de Investigación Social. Instituto Mora.', fontSize: 10, italics: true, alignment: 'left', color: '#BDBDBD'},
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
            {image: 'lais', fit: [110, 40], alignment: 'right'},
            {text: 'Ficha de catalogación', style: 'header'},
            {text: 'Catalogación del fondo de registros en video del Laboratorio Audiovisual de Investigación Social del Instituto Mora.'},

            // Área de identificación
            isAreaEmpty('identificacion', video.identificacion) ? '' : {text: 'Área de identificación', style: 'subheader'},
            isAreaEmpty('identificacion', video.identificacion) ? '' : {
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
            isAreaEmpty('contenidoEstructura', video.contenidoEstructura) ? '' : {text: 'Área de contenido y estructura', style: 'subheader'},
            isAreaEmpty('contenidoEstructura', video.contenidoEstructura) ? '' : {
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
            isAreaEmpty('condicionesAccesoUso', video.condicionesAccesoUso) ? '' : {text: 'Área de condiciones de acceso y uso', style: 'subheader'},
            isAreaEmpty('condicionesAccesoUso', video.condicionesAccesoUso) ? '' : {
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
            isAreaEmpty('documentacionAsociada', video.documentacionAsociada) ? '' : {text: 'Área de documentación asociada', style: 'subheader'},
            isAreaEmpty('documentacionAsociada', video.documentacionAsociada) ? '' : {
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
            isAreaEmpty('notas', video.notas) ? '' : {text: 'Área de notas', style: 'subheader'},
            isAreaEmpty('notas', video.notas) ? '' : {
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
            isAreaEmpty('controlDescripcion', video.controlDescripcion) ? '' : {text: 'Área de control de la descripción', style: 'subheader'},
            isAreaEmpty('controlDescripcion', video.controlDescripcion) ? '' : {
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

            // Imagen de referencia
            video.adicional.imagen ? {text: 'Imagen de referencia', style: 'subheader'} : '',
            video.adicional.imagen ? {image: getBase64Img(image.value), width: 150} : '',
            
            // Fecha de consulta
            {text: `Fecha de consulta: ${dayjs(new Date()).format('DD/MM/YYYY')}.`, fontSize: 10, margin: [0, 10]},
        ],
    }

    // Acción para que el usuario pueda descargar el pdf
    pdfMake.createPdf(docDefinition).download(`${video.identificacion.codigoReferencia}.pdf`)
}
</script>