<template>
    <!-- Imagen cargada pero oculta, necesaria para mostrar correctamente en PDF -->
    <img :src="`/data/image/${data.adicional.imagen}`" v-show="false" width="100%" height="auto" ref="image" id="image"></img>

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

// Auxiliares para mostrar imagen de referencia del conjunto para PDF (pdfmake)
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
    img.src = image.value.src
})

/**
 * Determina si un área/propiedad del conjunto documental está vacía
 * @param {string} areaString Nombre textual del área por verificar, tal como aparecen en el esquema de la BD
 * @param {Object} areaObject Objecto que representa el conjunto de propiedades del área por verificar
 * @returns {boolean} True si todas las propiedades del área son vacias, falso en otro caso
 */
 function isAreaEmpty(areaString, areaObject){
     switch(areaString){
         case 'identificacion':
            // Sección compartidos
            if(areaObject.codigoReferencia) return false
            if(areaObject.pais) return false
            if(areaObject.fecha) return false
            if(areaObject.nivelDescripcion) return false
            if(areaObject.titulo) return false
            // Sección nivel colección
            if(areaObject.volumenSoporte) return false
            if(areaObject.coordinacion) return false
            // Sección nivel grupo documental
            if(areaObject.proyectoInvestigacion) return false
            if(areaObject.entidadProductora) return false
            if(areaObject.investigacion) return false
            if(areaObject.coordinacionProyecto) return false
            if(areaObject.coordinacionProduccionAudiovisual) return false
            return true
        case 'contexto':
            if(areaObject.semblanzaBiografica) return false
            // Nivel de colección
            if(areaObject.historiaInstitucional) return false
            if(areaObject.historiaArchivistica) return false
            return true    
        case 'contenidoEstructura':
            if(areaObject.alcanceContenido) return false
            if(areaObject.valoracionSeleccionEliminacion) return false
            if(areaObject.nuevosIngresos) return false
            if(areaObject.organizacion) return false
            return true
        case 'condicionesAccesoUso':
            if(areaObject.condicionesAcceso) return false
            if(areaObject.condicionesReproduccion) return false
            return true
        case 'notas':
            if(areaObject.notas) return false
            return true
        case 'controlDescripcion':
            if(areaObject.documentalista) return false
            if(areaObject.reglasNormas) return false
            return true
        default:
            return true
    }
}

/**
 * Convierte una sección del conjunto documental a un arreglo de texto
 * compatible para una tabla en formato de pdfmake.
 * @param {string} areaName Nombre del área/propiedad que se desea convertir
 * @param {Object} conjunto Esquema de la base de datos para el conjunto documental
 * @returns {Array} Tabla de valores compatible con el formato de pdfmake
 */
function area2bodytable(areaName, conjunto){
    let parsedFields = []
    switch(areaName){
        case 'identificacion':
            if(conjunto.identificacion.codigoReferencia) parsedFields.push([format('codigoReferencia'), conjunto.identificacion.codigoReferencia])
            if(conjunto.identificacion.titulo) parsedFields.push([format('titulo'), conjunto.identificacion.titulo])
            if(conjunto.identificacion.pais) parsedFields.push([format('pais'), conjunto.identificacion.pais])
            if(conjunto.identificacion.fecha) parsedFields.push([format('fecha'), conjunto.identificacion.fecha])
            if(conjunto.identificacion.nivelDescripcion) parsedFields.push([format('nivelDescripcion'), conjunto.identificacion.nivelDescripcion])
            // Sección compartidos
            if(conjunto.identificacion.volumenSoporte) parsedFields.push([format('volumenSoporte'), conjunto.identificacion.volumenSoporte])
            if(conjunto.identificacion.coordinacion) parsedFields.push([format('coordinacion'), conjunto.identificacion.coordinacion])
            // Sección nivel de grupo documental
            if(conjunto.identificacion.proyectoInvestigacion) parsedFields.push([format('proyectoInvestigacion'), conjunto.identificacion.proyectoInvestigacion])
            if(conjunto.identificacion.entidadProductora) parsedFields.push([format('entidadProductora'), conjunto.identificacion.entidadProductora])
            if(conjunto.identificacion.investigacion) parsedFields.push([format('investigacion'), conjunto.identificacion.investigacion])
            if(conjunto.identificacion.coordinacionProyecto) parsedFields.push([format('coordinacionProyecto'), conjunto.identificacion.coordinacionProyecto])
            if(conjunto.identificacion.coordinacionProduccionAudiovisual) parsedFields.push([format('coordinacionProduccionAudiovisual'), conjunto.identificacion.coordinacionProduccionAudiovisual])
            break
        case 'contexto':
            if(conjunto.contexto.semblanzaBiografica) parsedFields.push([format('semblanzaBiografica'), conjunto.contexto.semblanzaBiografica])
            if(conjunto.contexto.historiaInstitucional) parsedFields.push([format('historiaInstitucional'), conjunto.contexto.historiaInstitucional])
            if(conjunto.contexto.historiaArchivistica) parsedFields.push([format('historiaArchivistica'), conjunto.contexto.historiaArchivistica])
            break
        case 'contenidoEstructura':
            if(conjunto.contenidoEstructura.alcanceContenido) parsedFields.push([format('alcanceContenido'), conjunto.contenidoEstructura.alcanceContenido])
            if(conjunto.contenidoEstructura.valoracionSeleccionEliminacion) parsedFields.push([format('valoracionSeleccionEliminacion'), conjunto.contenidoEstructura.valoracionSeleccionEliminacion])
            if(conjunto.contenidoEstructura.nuevosIngresos) parsedFields.push([format('nuevosIngresos'), conjunto.contenidoEstructura.nuevosIngresos])
            if(conjunto.contenidoEstructura.organizacion) parsedFields.push([format('organizacion'), conjunto.contenidoEstructura.organizacion])
            break
        case 'condicionesAccesoUso':
            if(conjunto.condicionesAccesoUso.condicionesAcceso) parsedFields.push([format('condicionesAcceso'), conjunto.condicionesAccesoUso.condicionesAcceso])
            if(conjunto.condicionesAccesoUso.condicionesReproduccion) parsedFields.push([format('condicionesReproduccion'), conjunto.condicionesAccesoUso.condicionesReproduccion])
            break
        case 'notas':
            if(conjunto.notas.notas) parsedFields.push([format('notas'), conjunto.notas.notas])
            break
        case 'controlDescripcion':
            if(conjunto.controlDescripcion.documentalista) parsedFields.push([format('documentalista'), conjunto.controlDescripcion.documentalista.fullname])
            if(conjunto.controlDescripcion.reglasNormas) parsedFields.push([format('reglasNormas'), conjunto.controlDescripcion.reglasNormas])
            parsedFields.push([format('createdAt'), dayjs(conjunto.createdAt).format('DD/MM/YYYY HH:mm')])
            parsedFields.push([format('updatedAt'), dayjs(conjunto.updatedAt).format('DD/MM/YYYY HH:mm')])
            break
    }

    return parsedFields
}

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
 * Acción para mostrar/descargar la documentación en formato PDF
 * @param {Object} conjunto Esquema de la base de datos para el conjunto
 */
function showPDF(conjunto){
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
        header: { text: `${conjunto.identificacion.codigoReferencia}`, fontSize: 10, italics: true, alignment: 'right', margin: [25, 25, 50, 50], color: '#BDBDBD'},
        
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
            isAreaEmpty('identificacion', conjunto.identificacion) ? '' : {text: 'Área de identificación', style: 'subheader'},
            isAreaEmpty('identificacion', conjunto.identificacion) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('identificacion', conjunto)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de contexto
            isAreaEmpty('contexto', conjunto.contexto) ? '' : {text: 'Área de contexto', style: 'subheader'},
            isAreaEmpty('contexto', conjunto.contexto) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('contexto', conjunto)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de contenido y estructura
            isAreaEmpty('contenidoEstructura', conjunto.contenidoEstructura) ? '' : {text: 'Área de contenido y estructura', style: 'subheader'},
            isAreaEmpty('contenidoEstructura', conjunto.contenidoEstructura) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('contenidoEstructura', conjunto)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de condiciones de acceso y uso
            isAreaEmpty('condicionesAccesoUso', conjunto.condicionesAccesoUso) ? '' : {text: 'Área de condiciones de acceso y uso', style: 'subheader'},
            isAreaEmpty('condicionesAccesoUso', conjunto.condicionesAccesoUso) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('condicionesAccesoUso', conjunto)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de notas
            isAreaEmpty('notas', conjunto.notas) ? '' : {text: 'Área de notas', style: 'subheader'},
            isAreaEmpty('notas', conjunto.notas) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('notas', conjunto)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Área de control de la descripción
            isAreaEmpty('controlDescripcion', conjunto.controlDescripcion) ? '' : {text: 'Área de control de la descripción', style: 'subheader'},
            isAreaEmpty('controlDescripcion', conjunto.controlDescripcion) ? '' : {
                style: 'table',
                table: {
                    widths: [100, '*'],
                    body: area2bodytable('controlDescripcion', conjunto)
                },
                layout: {
                    hLineWidth: function(i, node) {return (i === 0 || i === node.table.body.length) ? 0 : 1; },
                    vLineWidth: function(i, node) {return 0; },
                    hLineColor: function(i, node) {return 'gray'; },
                    vLineColor: function(i, node) {return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; }
                },
            },

            // Imagen de referencia
            conjunto.adicional.imagen ? {text: 'Imagen de referencia', style: 'subheader'} : '',
            conjunto.adicional.imagen ? {image: getBase64Img(image.value), width: 150} : '',
            
            // Fecha de consulta
            {text: `Fecha de consulta: ${dayjs(new Date()).format('DD/MM/YYYY')}.`, fontSize: 10, margin: [0, 10]},
        ],
    }

    // Acción para que el usuario pueda descargar el pdf
    pdfMake.createPdf(docDefinition).download(`${conjunto.identificacion.codigoReferencia}.pdf`)
}
</script>