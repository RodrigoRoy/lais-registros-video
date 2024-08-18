<template>
    <breadcrumbs :items="breadcrumbsItems"></breadcrumbs>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12" md="8" align-self="start">
                <v-sheet class="pa-2 ma-2" color="background">
                    <v-card elevation="2" height="auto" max-width="auto" variant="flat" color="surface">
                        
                        <!-- Menu para edición y borrado (requiere permisos) -->
                        <template v-slot:append v-if="auth.isLoggedIn && (auth.canUpdate || auth.canDelete)">
                            <v-menu transition="slide-y-transition">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" icon="mdi-dots-vertical" variant="plain"></v-btn>
                                </template>
                                <!-- Lista de acciones para administración -->
                                <v-list>
                                    <!-- EDITAR -->
                                    <v-list-item>
                                        <nuxt-link v-if="auth.canUpdate" :to="`/conjuntos/${conjunto._id}/edit`" class="text-decoration-none"><v-btn>Editar</v-btn></nuxt-link>
                                    </v-list-item>
                                    
                                    <!-- BORRAR -->
                                    <v-list-item>
                                        <!-- Opción para borrar con ventana emergente de confirmación -->
                                        <v-dialog :max-width="500">
                                            <template v-slot:activator="{ props: activatorProps }">
                                                <v-btn v-bind="activatorProps">Borrar</v-btn>
                                            </template>
                                            <template v-slot:default="{ isActive }">
                                                <v-card max-width="400" prepend-icon="mdi-alert" color="error" variant="elevated" title="Borrar registro" :text="`Por favor confirme la eliminación del registro ${conjunto.identificacion.codigoReferencia}. Esta operación no se puede revertir y la información almacenada se perderá.`" >
                                                    <v-card-actions>
                                                        <v-btn @click="isActive.value = false" variant="elevated" color="error">Cancel</v-btn>
                                                        <v-btn @click="deleteData(conjunto, 'conjunto')" variant="plain">Borrar</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </template>
                                        </v-dialog>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>

                        <template v-slot:title>
                            <span class="text-medium-emphasis">
                                {{ conjunto.identificacion.titulo }}
                            </span>
                        </template>

                        <v-card-text>
                            <!-- Presentación del conjunto documental -->
                            <div v-if="conjunto.adicional?.presentacion">
                                <p class="text-body-1 font-weight-light mb-6">
                                    {{ conjunto.adicional.presentacion }}
                                </p>
                            </div>
                            <!-- ÁREA DE IDENTIFICACIÓN -->
                            <div v-if="conjunto.identificacion?.codigoReferencia || conjunto.identificacion?.pais || conjunto.identificacion?.fecha || conjunto.identificacion?.nivelDescripcion || conjunto.identificacion?.titulo || conjunto.identificacion?.volumenSoporte || conjunto.identificacion?.coordinacion || conjunto.identificacion?.proyectoInvestigacion || conjunto.identificacion?.entidadProductora || conjunto.identificacion?.investigacion || conjunto.identificacion?.coordinacionProyecto || conjunto.identificacion?.coordinacionProduccionAudiovisual" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de identificación</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <!-- Compartidos -->
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.codigoReferencia">
                                            <p class="text-body-1 font-weight-medium text-accent">Código de referencia </p>
                                            <p class="text-body-1">{{ conjunto.identificacion.codigoReferencia }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.titulo">
                                            <p class="text-body-1 font-weight-medium text-accent">Título</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.titulo }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.pais">
                                            <p class="text-body-1 font-weight-medium text-accent">País</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.pais }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.fecha">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecho o periodo</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.fecha }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.nivelDescripcion">
                                            <p class="text-body-1 font-weight-medium text-accent">Nivel de descripción</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.nivelDescripcion }}</p>
                                        </v-col>
                                        <!-- Colección -->
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.volumenSoporte">
                                            <p class="text-body-1 font-weight-medium text-accent">Volumen y soporte</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.volumenSoporte }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.coordinacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Coordinación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.coordinacion }}</p>
                                        </v-col>
                                        <!-- Grupo documental -->
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.proyectoInvestigacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Proyecto de investigación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.proyectoInvestigacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.entidadProductora">
                                            <p class="text-body-1 font-weight-medium text-accent">Entidad productora</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.entidadProductora }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.investigacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Investigación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.investigacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.coordinacionProyecto">
                                            <p class="text-body-1 font-weight-medium text-accent">Coordinación del proyecto</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.coordinacionProyecto }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.coordinacionProduccionAudiovisual">
                                            <p class="text-body-1 font-weight-medium text-accent">Coordinación de producción audiovisual</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.coordinacionProduccionAudiovisual }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTEXTO -->
                            <div v-if="conjunto.contexto?.semblanzaBiografica || conjunto.contexto?.historiaInstitucional || conjunto.contexto?.historiaArchivistica" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de contexto</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <!-- Compartidos -->
                                        <v-col cols="12" v-if="conjunto.contexto?.semblanzaBiografica">
                                            <p class="text-body-1 font-weight-medium text-accent">Semblanza biográfica</p>
                                            <p class="text-body-1">{{ conjunto.contexto.semblanzaBiografica }}</p>
                                        </v-col>
                                        <!-- Colección -->
                                        <v-col cols="12" v-if="conjunto.contexto?.historiaInstitucional">
                                            <p class="text-body-1 font-weight-medium text-accent">Historia institucional</p>
                                            <p class="text-body-1">{{ conjunto.contexto.historiaInstitucional }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contexto?.historiaArchivistica">
                                            <p class="text-body-1 font-weight-medium text-accent">Historia archivistica</p>
                                            <p class="text-body-1">{{ conjunto.contexto.historiaArchivistica }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTENIDO Y ESTRUCTURA-->
                            <div v-if="conjunto.contenidoEstructura?.alcanceContenido || conjunto.contenidoEstructura?.valoracionSeleccionEliminacion || conjunto.contenidoEstructura?.nuevosIngresos || conjunto.contenidoEstructura?.organizacion" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de contenido y estructura</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <!-- Compartidos -->
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.alcanceContenido">
                                            <p class="text-body-1 font-weight-medium text-accent">Alcance y contenido</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.alcanceContenido }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.valoracionSeleccionEliminacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Valoración, selección y eliminación</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.valoracionSeleccionEliminacion }}</p>
                                        </v-col>
                                        <!-- Colección -->
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.nuevosIngresos">
                                            <p class="text-body-1 font-weight-medium text-accent">Nuevos ingresos</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.nuevosIngresos }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.organizacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Organización</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.organizacion }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONDICIONES DE ACCESO DE USO -->
                            <div v-if="conjunto.condicionesAccesoUso?.condicionesAcceso || conjunto.condicionesAccesoUso?.condicionesReproduccion" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de condiciones de acceso y uso</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="conjunto.condicionesAccesoUso?.condicionesAcceso">
                                            <p class="text-body-1 font-weight-medium text-accent">Condiciones de acceso</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.condicionesAcceso }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.condicionesAccesoUso?.condicionesReproduccion">
                                            <p class="text-body-1 font-weight-medium text-accent">Condiciones de reproducción</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.condicionesReproduccion }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE NOTAS -->
                            <div v-if="conjunto.notas?.notas" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de notas</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="conjunto.notas?.notas">
                                            <p class="text-body-1 font-weight-medium text-accent">Notas</p>
                                            <p class="text-body-1">{{ conjunto.notas.notas }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTROL DE LA DESCRIPCIÓN -->
                            <div v-if="conjunto.controlDescripcion?.documentalista || conjunto.controlDescripcion?.reglasNormas" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de control de la descripción</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <!-- Colección -->
                                        <v-col cols="12" v-if="conjunto.controlDescripcion.reglasNormas">
                                            <p class="text-body-1 font-weight-medium text-accent">Reglas o normas</p>
                                            <p class="text-body-1">{{ conjunto.controlDescripcion.reglasNormas }}</p>
                                        </v-col>
                                        <!-- Compartidos -->
                                        <v-col cols="12" sm="4" v-if="conjunto.controlDescripcion?.documentalista">
                                            <p class="text-body-1 font-weight-medium text-accent">Archivista</p>
                                            <p class="text-body-1">{{ conjunto.controlDescripcion.documentalista.fullname }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.createdAt">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecha de creación</p>
                                            <p class="text-body-1">{{ $dayjs(conjunto.createdAt).format('DD/MM/YYYY HH:mm') }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.updatedAt">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecha de actualización</p>
                                            <p class="text-body-1">{{ $dayjs(conjunto.updatedAt).format('DD/MM/YYYY HH:mm') }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-col>

            <v-col cols="12" md="4" align="center">
                <v-sheet class="pa-2 ma-2" color="background">
                        <v-card elevation="2" height="auto" width="auto" variant="flat">
                            <img v-if="conjunto.adicional?.imagen" :src="`/data/image/${conjunto.adicional.imagen}`" width="100%" height="auto" ref="image" id="image"></img>
                            <img v-else src="~/assets/Logo LAIS.png" width="100%" height="auto" ref="image" id="image"></img>

                            <!-- Acciones / botón para mostrar más información -->
                            <v-card-actions>
                                <v-btn size="small" prepend-icon="mdi-chart-bar">{{ conjunto.adicional.fetchCount }}</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                </v-sheet>

                <v-sheet class="pa-2 ma-2" color="background">
                        <v-card elevation="2" height="auto" width="auto" variant="flat">
                            <v-btn class="text-none" variant="tonal" block prepend-icon="mdi-file-pdf-box" @click="showPDF(conjunto)">Descargar PDF</v-btn>
                        </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
const auth = useAuthStore()
const message = useMessageStore()

// import PdfPrinter from 'pdfmake'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

const dayjs = useDayjs()

// Composable para obtener parametros desde URL
const route = useRoute()

// Información del conjunto documental
const { data: conjunto } = await useFetch(`/api/conjuntos/${route.params._id}`)
// Breadcrumbs
const { data: breadcrumbsItems } = await useFetch(`/api/breadcrumbs`, { query: { id: conjunto.value._id, last: true } })

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
/**
 * Borrar conjunto de la base de datos
 * @param {Object} data Conjunto que se desea borrar
 */
 async function deleteData(data){
    if(!data?._id)
        return

    try {
        // Borrar referencia del conjunto padre
        if(data.adicional?.parent)
            await $fetch(`/api/conjuntos/hierarchy/${data.adicional.parent}`, {
                method: 'DELETE',
                query: {id: data._id, type: "conjunto"}
            })
    
        // Borrar conjunto
        await $fetch(`/api/conjuntos/${data._id}`, {
            method: 'DELETE',
            query: { id: auth?.id }
        })
    
        // Mostrar mensaje al usuario
        message.show({text: 'Conjunto borrado', color: "success"})
    
        if(data.adicional?.parent)
            navigateTo(`/nav?id=${data.adicional.parent}`)
        else
            navigateTo('/')
    } catch (error) {
        // Mostrar mensaje al usuario
        message.show({text: 'Error al borrar', color: "error"})
    }
}
</script>