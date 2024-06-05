<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12" md="8" align-self="start">
                <v-sheet class="pa-2 ma-2">
                    <v-card elevation="2" height="auto" max-width="auto" variant="text">
                        
                        <!-- Menu para edición y borrado (requiere permisos) -->
                        <template v-slot:append v-if="auth.isLoggedIn && (auth.canUpdate || auth.canDelete)">
                            <v-menu transition="slide-y-transition">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" icon="mdi-dots-horizontal" variant="plain"></v-btn>
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
                                                        <v-btn @click="deleteConjunto(conjunto._id)" variant="plain">Borrar</v-btn>
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
                            <!-- ÁREA DE IDENTIFICACIÓN -->
                            <div v-if="conjunto.identificacion?.codigoReferencia || conjunto.identificacion?.pais || conjunto.identificacion?.fecha || conjunto.identificacion?.nivelDescripcion || conjunto.identificacion?.titulo || conjunto.identificacion?.volumenSoporte || conjunto.identificacion?.coordinacion || conjunto.identificacion?.proyectoInvestigacion || conjunto.identificacion?.entidadProductora || conjunto.identificacion?.investigacion || conjunto.identificacion?.coordinacionProyecto || conjunto.identificacion?.coordinacionProduccionAudiovisual" class="mt-2 mb-4">
                                <div>
                                    <p class=" text-h6 font-italic font-weight-light">Área de identificación</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.codigoReferencia">
                                            <p class="text-body-1 font-weight-medium text-secondary">Código de referencia </p>
                                            <p class="text-body-1">{{ conjunto.identificacion.codigoReferencia }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.titulo">
                                            <p class="text-body-1 font-weight-medium text-secondary">Título </p>
                                            <p class="text-body-1">{{ conjunto.identificacion.titulo }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.pais">
                                            <p class="text-body-1 font-weight-medium text-secondary">País</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.pais }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.fecha">
                                            <p class="text-body-1 font-weight-medium text-secondary">Fecha</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.fecha }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.nivelDescripcion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Nivel de descripción</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.nivelDescripcion }}</p>
                                        </v-col>
                                        <!-- Solo colección -->
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.volumenSoporte">
                                            <p class="text-body-1 font-weight-medium text-secondary">Volumen y soporte</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.volumenSoporte }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.coordinacion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Coordinación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.coordinacion }}</p>
                                        </v-col>
                                        <!-- Solo grupo documental -->
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.proyectoInvestigacion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Proyecto de investigación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.proyectoInvestigacion }}</p>
                                        </v-col>
                                        <!-- <v-col cols="12" sm="4" v-if="conjunto.identificacion?.entrevista">
                                            <p class="text-body-1 font-weight-medium text-secondary">Entrevistador/a</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.entrevista }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.camara">
                                            <p class="text-body-1 font-weight-medium text-secondary">Cámara</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.camara }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.iluminacion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Iluminación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.iluminacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.asistencia">
                                            <p class="text-body-1 font-weight-medium text-secondary">Asistencia</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.asistencia }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.sonido">
                                            <p class="text-body-1 font-weight-medium text-secondary">Sonido</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.sonido }}</p>
                                        </v-col> -->
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTENIDO Y ESTRUCTURA -->
                            <!-- <div v-if="conjunto.contenidoEstructura?.descripcionGeneral || conjunto.contenidoEstructura?.descriptorOnomastico || conjunto.contenidoEstructura?.descriptorToponimico || conjunto.contenidoEstructura?.estructuraFormal" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de contenido y estructura</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.descripcionGeneral">
                                            <p class="text-body-1 font-weight-medium text-secondary">Descripción general</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.descripcionGeneral }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.descriptorOnomastico">
                                            <p class="text-body-1 font-weight-medium text-secondary">Descriptor onomástico</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.descriptorOnomastico }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.descriptorToponimico">
                                            <p class="text-body-1 font-weight-medium text-secondary">Descriptor toponímico</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.descriptorToponimico }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.estructuraFormal">
                                            <p class="text-body-1 font-weight-medium text-secondary">Estructura formal</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.estructuraFormal }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div> -->

                            <!-- ÁREA DE CONDICIONES DE ACCESO Y USO-->
                            <!-- <div v-if="conjunto.condicionesAccesoUso?.idiomaOriginal || conjunto.condicionesAccesoUso?.soporte || conjunto.condicionesAccesoUso?.numeroCasetes || conjunto.condicionesAccesoUso?.color || conjunto.condicionesAccesoUso?.audio || conjunto.condicionesAccesoUso?.sistemaGrabacion || conjunto.condicionesAccesoUso?.resolucionGrabacion || conjunto.condicionesAccesoUso?.formatoVideoDigital || conjunto.condicionesAccesoUso?.requisitosTecnicos" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de condiciones de acceso y uso</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.idiomaOriginal">
                                            <p class="text-body-1 font-weight-medium text-secondary">Idioma original</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.idiomaOriginal }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.soporte">
                                            <p class="text-body-1 font-weight-medium text-secondary">Soporte</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.soporte }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.numeroCasetes">
                                            <p class="text-body-1 font-weight-medium text-secondary">Número de casetes</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.numeroCasetes }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.color">
                                            <p class="text-body-1 font-weight-medium text-secondary">Color</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.color }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.audio">
                                            <p class="text-body-1 font-weight-medium text-secondary">Audio</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.audio }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.sistemaGrabacion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Sistema de grabación</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.sistemaGrabacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.resolucionGrabacion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Resolución de grabación</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.resolucionGrabacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.formatoVideoDigital">
                                            <p class="text-body-1 font-weight-medium text-secondary">Formato de video digital</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.formatoVideoDigital }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.condicionesAccesoUso?.requisitosTecnicos">
                                            <p class="text-body-1 font-weight-medium text-secondary">Requisitos técnicos</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.requisitosTecnicos }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div> -->

                            <!-- ÁREA DE NOTAS -->
                            <div v-if="conjunto.notas?.notas" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de notas</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="conjunto.notas?.notas">
                                            <p class="text-body-1 font-weight-medium text-secondary">Notas</p>
                                            <p class="text-body-1">{{ conjunto.notas.notas }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTROL DE LA DESCRIPCIÓN -->
                            <div v-if="conjunto.controlDescripcion" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de control de la descripción</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="4" v-if="conjunto.controlDescripcion?.documentalista">
                                            <p class="text-body-1 font-weight-medium text-secondary">Archivista</p>
                                            <p class="text-body-1">{{ conjunto.controlDescripcion.documentalista.fullname }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.createdAt">
                                            <p class="text-body-1 font-weight-medium text-secondary">Fecha de creación</p>
                                            <p class="text-body-1">{{ $dayjs(conjunto.createdAt).format('DD/MM/YYYY HH:mm') }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.updatedAt">
                                            <p class="text-body-1 font-weight-medium text-secondary">Fecha de actualización</p>
                                            <p class="text-body-1">{{ $dayjs(conjunto.updatedAt).format('DD/MM/YYYY HH:mm') }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- TODO: Área adicional no debe mostrarse en esta página -->
                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-col>

            <v-col cols="12" md="4" align="center">
                <v-sheet class="pa-2 ma-2">
                        <v-card elevation="2" height="auto" width="auto" >
                            <img v-if="conjunto.adicional?.imagen" :src="`/data/image/${conjunto.adicional.imagen}`" width="100%" height="auto" ref="image" id="image"></img>
                            <img v-else src="~/assets/Logo LAIS.png" width="auto" height="300" ref="image" id="image"></img>

                            <!-- Acciones / botón para mostrar más información -->
                            <v-card-actions>
                                <v-btn size="small" prepend-icon="mdi-chart-bar">{{ conjunto.adicional.fetchCount }}</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                </v-sheet>

                <v-sheet class="pa-2 ma-2">
                        <v-card elevation="2" height="auto" width="auto" >
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
const auth = useAuthStore()

// import PdfPrinter from 'pdfmake'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

const dayjs = useDayjs()

// Composable para obtener parametros desde URL
const route = useRoute()

// Información del conjunto documental
const { data: conjunto} = await useFetch(`/api/conjuntos/${route.params._id}`)

/**
 * TODO: ACTUALIZAR AL ESQUEMA DE CONJUNTO
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
 * TODO: ACTUALIZAR AL ESQUEMA DE CONJUNTO DOCUMENTAL
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
            if(conjunto.identificacion.codigoReferencia) parsedFields.push([format('codigoReferencia'), conjunto.identificacion.codigoReferencia])
            if(conjunto.identificacion.fecha) parsedFields.push([format('fecha'), conjunto.identificacion.fecha])
            if(conjunto.identificacion.lugar) parsedFields.push([format('lugar'), conjunto.identificacion.lugar])
            if(conjunto.identificacion.pais) parsedFields.push([format('pais'), conjunto.identificacion.pais])
            if(conjunto.identificacion.duracion) parsedFields.push([format('duracion'), conjunto.identificacion.duracion])
            if(conjunto.identificacion.personasEntrevistadas) parsedFields.push([format('personasEntrevistadas'), conjunto.identificacion.personasEntrevistadas])
            if(conjunto.identificacion.entrevista) parsedFields.push([format('entrevista'), conjunto.identificacion.entrevista])
            if(conjunto.identificacion.camara) parsedFields.push([format('camara'), conjunto.identificacion.camara])
            if(conjunto.identificacion.iluminacion) parsedFields.push([format('iluminacion'), conjunto.identificacion.iluminacion])
            if(conjunto.identificacion.asistencia) parsedFields.push([format('asistencia'), conjunto.identificacion.asistencia])
            if(conjunto.identificacion.sonido) parsedFields.push([format('sonido'), conjunto.identificacion.sonido])
            break
        case 'contenidoEstructura':
            if(conjunto.contenidoEstructura.descripcionGeneral) parsedFields.push([format('descripcionGeneral'), conjunto.contenidoEstructura.descripcionGeneral])
            if(conjunto.contenidoEstructura.estructuraFormal) parsedFields.push([format('estructuraFormal'), conjunto.contenidoEstructura.estructuraFormal])
            if(conjunto.contenidoEstructura.descriptorOnomastico) parsedFields.push([format('descriptorOnomastico'), conjunto.contenidoEstructura.descriptorOnomastico])
            if(conjunto.contenidoEstructura.descriptorToponimico) parsedFields.push([format('descriptorToponimico'), conjunto.contenidoEstructura.descriptorToponimico])
            break
        case 'condicionesAccesoUso':
            if(conjunto.condicionesAccesoUso.idiomaOriginal) parsedFields.push([format('idiomaOriginal'), conjunto.condicionesAccesoUso.idiomaOriginal])
            if(conjunto.condicionesAccesoUso.soporte) parsedFields.push([format('soporte'), conjunto.condicionesAccesoUso.soporte])
            if(conjunto.condicionesAccesoUso.numeroCasetes) parsedFields.push([format('numeroCasetes'), conjunto.condicionesAccesoUso.numeroCasetes])
            if(conjunto.condicionesAccesoUso.color) parsedFields.push([format('color'), conjunto.condicionesAccesoUso.color])
            if(conjunto.condicionesAccesoUso.audio) parsedFields.push([format('audio'), conjunto.condicionesAccesoUso.audio])
            if(conjunto.condicionesAccesoUso.sistemaGrabacion) parsedFields.push([format('sistemaGrabacion'), conjunto.condicionesAccesoUso.sistemaGrabacion])
            if(conjunto.condicionesAccesoUso.resolucionGrabacion) parsedFields.push([format('resolucionGrabacion'), conjunto.condicionesAccesoUso.resolucionGrabacion])
            if(conjunto.condicionesAccesoUso.formatoVideoDigital) parsedFields.push([format('formatoVideoDigital'), conjunto.condicionesAccesoUso.formatoVideoDigital])
            if(conjunto.condicionesAccesoUso.requisitosTecnicos) parsedFields.push([format('requisitosTecnicos'), conjunto.condicionesAccesoUso.requisitosTecnicos])
            break
        case 'documentacionAsociada':
            if(conjunto.documentacionAsociada.unidadesDescripcionRelacionadas) parsedFields.push([format('unidadesDescripcionRelacionadas'), conjunto.documentacionAsociada.unidadesDescripcionRelacionadas])
            if(conjunto.documentacionAsociada.documentosAsociados) parsedFields.push([format('documentosAsociados'), conjunto.documentacionAsociada.documentosAsociados])
            break
        case 'notas':
            if(conjunto.notas.notas) parsedFields.push([format('notas'), conjunto.notas.notas])
            break
        case 'controlDescripcion':
            if(conjunto.controlDescripcion.documentalista) parsedFields.push([format('documentalista'), conjunto.controlDescripcion.documentalista.fullname])
            parsedFields.push([format('createdAt'), dayjs(conjunto.createdAt).format('DD/MM/YYYY HH:mm')])
            parsedFields.push([format('updatedAt'), dayjs(conjunto.updatedAt).format('DD/MM/YYYY HH:mm')])
            break
    }

    return parsedFields
}

// Auxiliares para mostrar imagen de referencia del video en PDF (pdfmake)
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