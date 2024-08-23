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
                                        <nuxt-link v-if="auth.canUpdate" :to="`/videos/${video._id}/edit`" class="text-decoration-none"><v-btn>Editar</v-btn></nuxt-link>
                                    </v-list-item>
                                    
                                    <!-- BORRAR -->
                                    <v-list-item>
                                        <!-- Opción para borrar con ventana emergente de confirmación -->
                                        <v-dialog :max-width="500">
                                            <template v-slot:activator="{ props: activatorProps }">
                                                <v-btn v-bind="activatorProps">Borrar</v-btn>
                                            </template>
                                            <template v-slot:default="{ isActive }">
                                                <v-card max-width="400" prepend-icon="mdi-alert" color="error" variant="elevated" title="Borrar registro" :text="`Por favor confirme la eliminación del registro ${video.identificacion.codigoReferencia}. Esta operación no se puede revertir y la información almacenada se perderá.`" >
                                                    <v-card-actions>
                                                        <v-btn @click="isActive.value = false" variant="elevated" color="error">Cancel</v-btn>
                                                        <v-btn @click="deleteData(video)" variant="plain">Borrar</v-btn>
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
                                {{ video.identificacion.codigoReferencia }}
                            </span>
                        </template>

                        <!-- <v-card-title class="text-medium-emphasis">
                            {{ video.identificacion.codigoReferencia }}
                        </v-card-title> -->

                        <v-card-text>
                            <!-- ÁREA DE IDENTIFICACIÓN -->
                            <div v-if="video.identificacion?.codigoReferencia || video.identificacion?.fecha || video.identificacion?.lugar || video.identificacion?.pais || video.identificacion?.duracion || video.identificacion?.personasEntrevistadas || video.identificacion?.entrevista || video.identificacion?.camara || video.identificacion?.iluminacion || video.identificacion?.asistencia || video.identificacion?.sonido" class="mt-2 mb-4">
                                <div>
                                    <p class=" text-h6 font-italic font-weight-light">Área de identificación</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.codigoReferencia">
                                            <p class="text-body-1 font-weight-medium text-accent">Código de referencia </p>
                                            <p class="text-body-1">{{ video.identificacion.codigoReferencia }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.fecha">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecha</p>
                                            <p class="text-body-1">{{ $dayjs(video.identificacion.fecha).format('D/MMMM/YYYY') }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.lugar">
                                            <p class="text-body-1 font-weight-medium text-accent">Lugar</p>
                                            <p class="text-body-1">{{ video.identificacion.lugar }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.pais">
                                            <p class="text-body-1 font-weight-medium text-accent">Pais</p>
                                            <p class="text-body-1">{{ video.identificacion.pais }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.duracion">
                                            <p class="text-body-1 font-weight-medium text-accent">Duración</p>
                                            <p class="text-body-1">{{ minutesToHour(video.identificacion.duracion) }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.personasEntrevistadas">
                                            <p class="text-body-1 font-weight-medium text-accent">Personas entrevistadas</p>
                                            <p class="text-body-1">{{ video.identificacion.personasEntrevistadas }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.entrevista">
                                            <p class="text-body-1 font-weight-medium text-accent">Entrevistador/a</p>
                                            <p class="text-body-1">{{ video.identificacion.entrevista }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.camara">
                                            <p class="text-body-1 font-weight-medium text-accent">Cámara</p>
                                            <p class="text-body-1">{{ video.identificacion.camara }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.iluminacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Iluminación</p>
                                            <p class="text-body-1">{{ video.identificacion.iluminacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.asistencia">
                                            <p class="text-body-1 font-weight-medium text-accent">Asistencia</p>
                                            <p class="text-body-1">{{ video.identificacion.asistencia }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.sonido">
                                            <p class="text-body-1 font-weight-medium text-accent">Sonido</p>
                                            <p class="text-body-1">{{ video.identificacion.sonido }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTENIDO Y ESTRUCTURA -->
                            <div v-if="video.contenidoEstructura?.descripcionGeneral || video.contenidoEstructura?.descriptorOnomastico || video.contenidoEstructura?.descriptorToponimico || video.contenidoEstructura?.estructuraFormal" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de contenido y estructura</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="video.contenidoEstructura?.descripcionGeneral">
                                            <p class="text-body-1 font-weight-medium text-accent">Descripción general</p>
                                            <p class="text-body-1">{{ video.contenidoEstructura.descripcionGeneral }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="video.contenidoEstructura?.descriptorOnomastico">
                                            <p class="text-body-1 font-weight-medium text-accent">Descriptor onomástico</p>
                                            <p class="text-body-1">{{ video.contenidoEstructura.descriptorOnomastico }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="video.contenidoEstructura?.descriptorToponimico">
                                            <p class="text-body-1 font-weight-medium text-accent">Descriptor toponímico</p>
                                            <p class="text-body-1">{{ video.contenidoEstructura.descriptorToponimico }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="video.contenidoEstructura?.estructuraFormal">
                                            <p class="text-body-1 font-weight-medium text-accent">Estructura formal</p>
                                            <p class="text-body-1">{{ video.contenidoEstructura.estructuraFormal }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONDICIONES DE ACCESO Y USO-->
                            <div v-if="video.condicionesAccesoUso?.idiomaOriginal || video.condicionesAccesoUso?.soporte || video.condicionesAccesoUso?.numeroCasetes || video.condicionesAccesoUso?.color || video.condicionesAccesoUso?.audio || video.condicionesAccesoUso?.sistemaGrabacion || video.condicionesAccesoUso?.resolucionGrabacion || video.condicionesAccesoUso?.formatoVideoDigital || video.condicionesAccesoUso?.requisitosTecnicos" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de condiciones de acceso y uso</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.idiomaOriginal">
                                            <p class="text-body-1 font-weight-medium text-accent">Idioma original</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.idiomaOriginal }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.soporte">
                                            <p class="text-body-1 font-weight-medium text-accent">Soporte</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.soporte }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.numeroCasetes">
                                            <p class="text-body-1 font-weight-medium text-accent">Número de casetes</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.numeroCasetes }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.color">
                                            <p class="text-body-1 font-weight-medium text-accent">Color</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.color }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.audio">
                                            <p class="text-body-1 font-weight-medium text-accent">Audio</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.audio }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.sistemaGrabacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Sistema de grabación</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.sistemaGrabacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.resolucionGrabacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Resolución de grabación</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.resolucionGrabacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.formatoVideoDigital">
                                            <p class="text-body-1 font-weight-medium text-accent">Formato de video digital</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.formatoVideoDigital }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.requisitosTecnicos">
                                            <p class="text-body-1 font-weight-medium text-accent">Requisitos técnicos</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.requisitosTecnicos }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE DOCUMENTACIÓN ASOCIADA -->
                            <div v-if="video.documentacionAsociada?.unidadesDescripcionRelacionadas || video.documentacionAsociada?.documentosAsociados" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de documentación asociada</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="video.documentacionAsociada?.unidadesDescripcionRelacionadas">
                                            <p class="text-body-1 font-weight-medium text-accent">Unidades de descripción relacionadas</p>
                                            <p class="text-body-1">{{ video.documentacionAsociada.unidadesDescripcionRelacionadas }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="video.documentacionAsociada?.documentosAsociados">
                                            <p class="text-body-1 font-weight-medium text-accent">Documentos asociados</p>
                                            <p class="text-body-1">{{ video.documentacionAsociada.documentosAsociados }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE NOTAS -->
                            <div v-if="video.notas?.notas" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de notas</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="video.notas?.notas">
                                            <p class="text-body-1 font-weight-medium text-accent">Notas</p>
                                            <p class="text-body-1">{{ video.notas.notas }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTROL DE LA DESCRIPCIÓN -->
                            <div v-if="video.controlDescripcion?.documentalista" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de control de la descripción</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="4" v-if="video.controlDescripcion?.documentalista">
                                            <p class="text-body-1 font-weight-medium text-accent">Archivista</p>
                                            <p class="text-body-1">{{ video.controlDescripcion.documentalista.fullname }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.createdAt">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecha de creación</p>
                                            <p class="text-body-1">{{ $dayjs(video.createdAt).format('DD/MM/YYYY HH:mm') }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.updatedAt">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecha de actualización</p>
                                            <p class="text-body-1">{{ $dayjs(video.updatedAt).format('DD/MM/YYYY HH:mm') }}</p>
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
                            <!-- <img :src="`/data/image/${video.adicional.imagen}`" width="100%" height="auto" v-show="false" ref="image" id="image"></img> -->

                            <video v-if="video.adicional.clipVideo" ref="videoClip" @play="videoClipStarPlaying" @pause="videoClipStopPlaying(video)" controls width="100%" height="auto" :poster="`/data/image/${video.adicional.imagen}`" :loop="false" :muted="false">
                                <source :src="`/data/video/${video.adicional.clipVideo}`" />
                                <p>
                                    Tu navegador no soporta video HTML. Aquí hay un
                                    <a :href="`/data/video/${video.adicional.clipVideo}`" :download="`/data/video/${video.adicional.clipVideo}`">enlace al video</a>.
                                </p>
                            </video>


                            <!-- Acciones / botón para mostrar más información -->
                            <v-card-actions>
                                <v-btn size="small" :prepend-icon="video.adicional.bookmarkedBy.includes(auth.id) ? 'mdi-bookmark' : 'mdi-bookmark-outline'" @click.prevent.stop="toggleBookmark(video)">{{ video.adicional.bookmarkedBy.length }}</v-btn>
                                <v-btn size="small" v-show="auth.isLoggedIn && auth.canCreate && auth.canUpdate" prepend-icon="mdi-chart-bar">{{ video.adicional.fetchCount }}</v-btn>
                                <v-btn size="small" v-show="auth.isLoggedIn && auth.canCreate && auth.canUpdate" prepend-icon="mdi-play">{{ video.adicional.playCount }}</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                </v-sheet>

                <v-sheet class="pa-2 ma-2" color="background">
                        <v-card elevation="2" height="auto" width="auto" variant="flat">
                            <v-btn v-if="video.adicional.documentoCalificacion" class="text-none" variant="flat" block prepend-icon="mdi-file-document" :href="getDocumentURL(video.adicional.documentoCalificacion)">Documento de calificación</v-btn>
                            <v-btn class="text-none" variant="flat" block prepend-icon="mdi-file-pdf-box" @click="showPDF(video)">Descargar PDF</v-btn>
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

// Información del registro de video
const { data: video} = await useFetch(`/api/videos/${route.params._id}`)
// Breadcrumbs
const { data: breadcrumbsItems} = await useFetch('/api/breadcrumbs', { query: { id: video.value._id, type: 'video', disable: true } } )

// Referencia al videoclip
const videoClip = ref(null)

// Información auxiliar para detectar vistas del clip de video
const videoClipData = reactive({
    start: 0, // tiempo en segundo del video cuando se reproduce
    stop: 0, // tiempo en segundo del video cuando se pausa
    duration: 0, // duración total del video clip
    playedPercent: 0, // porcentaje (entero) de reproducción
    acceptedPercent: 25, // porcentaje para considerar el video como visto
})

/**
 * Acciones cuando se comienza a reproducir el videoclip
 */
function videoClipStarPlaying(){
    videoClipData.start = videoClip.value?.currentTime
}

/**
 * Acciones cuando se pausa el video.
 * Calcula el porcentaje de vista del videoclip y lo marca como visto.
 * @param {object} video Representa un registro de video
 */
async function videoClipStopPlaying(video){
    videoClipData.stop = videoClip.value?.currentTime
    videoClipData.duration = videoClip.value?.duration
    videoClipData.playedPercent = parseInt((Math.abs( videoClipData.start - videoClipData.stop ) * 100) / videoClipData.duration)
    
    // Verificar que el tiempo de reproducción cuente como una vista
    if(videoClipData.playedPercent >= videoClipData.acceptedPercent){
        video.adicional.playCount = video.adicional.playCount + 1
        
        // Actualizar contador de vistas del video en la base de datos
        await $fetch(`/api/videos/${video._id}`, {
            method: 'PUT',
            body: JSON.parse(JSON.stringify(video)),
        })
    }
}

/**
 * Agrega o quita un video de la lista de marcadores.
 * Nota: Para evitar recargar la información de la lista de videos,
 * además de realizar la petición a la BD para actualizar, 
 * se modifica directamente la propiedad "video.adicional.bookmarkedBy"
 * @param {object} video Representa un registro de video
 */
 async function toggleBookmark(video){
    // Sin sesión iniciada, no realizar cambios
    if(!auth.id) return
    
    // Si hay sesión iniciada y está incluida en lista de marcadores
    if(video.adicional.bookmarkedBy.includes(auth.id)){
        // Quitar de la lista de marcadores
        video.adicional.bookmarkedBy.splice(video.adicional.bookmarkedBy.indexOf(auth.id), 1)
        await $fetch(`/api/bookmarks/user/${auth.id}`, {
            method: 'DELETE',
            body: video,
        })
    }
    else {
        // Agregar a la lista de marcadores
        video.adicional.bookmarkedBy.push(auth.id)
        // Actualizar en la base de datos
        await $fetch(`/api/bookmarks/user/${auth.id}`, {
            method: 'PUT',
            body: video,
        })
    }
    // Actualizar token (en particular, la lista de marcadores)
    await auth.updateToken()
}

/**
 * Devuelve el path (ruta completa) del documento de calificación
 * @param {string} filename Nombre del archivo según la base de datos
 */
function getDocumentURL(filename){
    return `/data/document/${filename}`
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

/**
 * Borrar video de la base de datos
 * @param {Object} data Video que se desea borrar
 */
 async function deleteData(data){
    if(!data?._id)
        return

    try {
        // Borrar referencia del conjunto padre
        if(data.adicional?.parent)
            await $fetch(`/api/conjuntos/hierarchy/${data.adicional.parent}`, {
                method: 'DELETE',
                query: {id: data._id, type: "video"}
            })
        // Borrar video
        await $fetch(`/api/videos/${data._id}`, {
            method: 'DELETE',
            query: { id: auth?.id }
        })
    
        // Mostrar mensaje al usuario
        message.show({text: 'Video borrado', color: "success"})
    
        navigateTo(`/nav?id=${data.adicional.parent}`)
        
    } catch (error) {
        // Mostrar mensaje al usuario
        message.show({text: 'Error al borrar', color: "error"})
    }
}
</script>