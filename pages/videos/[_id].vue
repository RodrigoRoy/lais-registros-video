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
                                                        <v-btn @click="deleteVideo(video._id)" variant="plain">Borrar</v-btn>
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
                                            <p class="text-body-1 font-weight-medium text-secondary">Código de referencia </p>
                                            <p class="text-body-1">{{ video.identificacion.codigoReferencia }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.fecha">
                                            <p class="text-body-1 font-weight-medium text-secondary">Fecha</p>
                                            <p class="text-body-1">{{ $dayjs(video.identificacion.fecha).format('D/MMMM/YYYY') }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.lugar">
                                            <p class="text-body-1 font-weight-medium text-secondary">Lugar</p>
                                            <p class="text-body-1">{{ video.identificacion.lugar }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.pais">
                                            <p class="text-body-1 font-weight-medium text-secondary">Pais</p>
                                            <p class="text-body-1">{{ video.identificacion.pais }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.duracion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Duración</p>
                                            <p class="text-body-1">{{ minutesToHour(video.identificacion.duracion) }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.personasEntrevistadas">
                                            <p class="text-body-1 font-weight-medium text-secondary">Personas entrevistadas</p>
                                            <p class="text-body-1">{{ video.identificacion.personasEntrevistadas }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.entrevista">
                                            <p class="text-body-1 font-weight-medium text-secondary">Entrevistador/a</p>
                                            <p class="text-body-1">{{ video.identificacion.entrevista }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.camara">
                                            <p class="text-body-1 font-weight-medium text-secondary">Cámara</p>
                                            <p class="text-body-1">{{ video.identificacion.camara }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.iluminacion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Iluminación</p>
                                            <p class="text-body-1">{{ video.identificacion.iluminacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.asistencia">
                                            <p class="text-body-1 font-weight-medium text-secondary">Asistencia</p>
                                            <p class="text-body-1">{{ video.identificacion.asistencia }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.identificacion?.sonido">
                                            <p class="text-body-1 font-weight-medium text-secondary">Sonido</p>
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
                                            <p class="text-body-1 font-weight-medium text-secondary">Descripción general</p>
                                            <p class="text-body-1">{{ video.contenidoEstructura.descripcionGeneral }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="video.contenidoEstructura?.descriptorOnomastico">
                                            <p class="text-body-1 font-weight-medium text-secondary">Descriptor onomástico</p>
                                            <p class="text-body-1">{{ video.contenidoEstructura.descriptorOnomastico }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="video.contenidoEstructura?.descriptorToponimico">
                                            <p class="text-body-1 font-weight-medium text-secondary">Descriptor toponímico</p>
                                            <p class="text-body-1">{{ video.contenidoEstructura.descriptorToponimico }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="video.contenidoEstructura?.estructuraFormal">
                                            <p class="text-body-1 font-weight-medium text-secondary">Estructura formal</p>
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
                                            <p class="text-body-1 font-weight-medium text-secondary">Idioma original</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.idiomaOriginal }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.soporte">
                                            <p class="text-body-1 font-weight-medium text-secondary">Soporte</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.soporte }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.numeroCasetes">
                                            <p class="text-body-1 font-weight-medium text-secondary">Número de casetes</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.numeroCasetes }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.color">
                                            <p class="text-body-1 font-weight-medium text-secondary">Color</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.color }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.audio">
                                            <p class="text-body-1 font-weight-medium text-secondary">Audio</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.audio }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.sistemaGrabacion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Sistema de grabación</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.sistemaGrabacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.resolucionGrabacion">
                                            <p class="text-body-1 font-weight-medium text-secondary">Resolución de grabación</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.resolucionGrabacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.formatoVideoDigital">
                                            <p class="text-body-1 font-weight-medium text-secondary">Formato de video digital</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.formatoVideoDigital }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.requisitosTecnicos">
                                            <p class="text-body-1 font-weight-medium text-secondary">Requisitos técnicos</p>
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
                                            <p class="text-body-1 font-weight-medium text-secondary">Unidades de descripción relacionadas</p>
                                            <p class="text-body-1">{{ video.documentacionAsociada.unidadesDescripcionRelacionadas }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="video.documentacionAsociada?.documentosAsociados">
                                            <p class="text-body-1 font-weight-medium text-secondary">Documentos asociados</p>
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
                                            <p class="text-body-1 font-weight-medium text-secondary">Notas</p>
                                            <p class="text-body-1">{{ video.notas.notas }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTROL DE LA DESCRIPCIÓN -->
                            <div v-if="video.controlDescripcion" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de control de la descripción</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="4" v-if="video.controlDescripcion?.documentalista">
                                            <p class="text-body-1 font-weight-medium text-secondary">Archivista</p>
                                            <p class="text-body-1">{{ video.controlDescripcion.documentalista.fullname }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.createdAt">
                                            <p class="text-body-1 font-weight-medium text-secondary">Fecha de creación</p>
                                            <p class="text-body-1">{{ $dayjs(video.createdAt).format('DD/MM/YYYY HH:mm') }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.updatedAt">
                                            <p class="text-body-1 font-weight-medium text-secondary">Fecha de actualización</p>
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
                <v-sheet class="pa-2 ma-2">
                        <v-card elevation="2" height="auto" width="auto" >
                            <video ref="videoClip" @play="videoClipStarPlaying" @pause="videoClipStopPlaying(video)" controls width="100%" height="auto" :poster="`/data/image/${video.adicional.imagen}`" :loop="false" :muted="false">
                                <source :src="`/data/video/${video.adicional.clipVideo}`" />
                                <p>
                                    Tu navegador no soporta video HTML. Aquí hay un
                                    <a :href="`/data/video/${video.adicional.clipVideo}`" :download="`/data/video/${video.adicional.clipVideo}`">enlace al video</a>.
                                </p>
                            </video>

                            <!-- Acciones / botón para mostrar más información -->
                            <v-card-actions>
                                <v-btn size="small" :prepend-icon="video.adicional.bookmarkedBy.includes(auth.id) ? 'mdi-bookmark' : 'mdi-bookmark-outline'" @click.prevent.stop="toggleBookmark(video)">{{ video.adicional.bookmarkedBy.length }}</v-btn>
                                <v-btn size="small" prepend-icon="mdi-chart-bar">{{ video.adicional.fetchCount }}</v-btn>
                                <v-btn size="small" prepend-icon="mdi-play">{{ video.adicional.playCount }}</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                </v-sheet>

                <v-sheet class="pa-2 ma-2">
                        <v-card elevation="2" height="auto" width="auto" >
                            <v-btn class="text-none" variant="tonal" block prepend-icon="mdi-file-document">Documento de calificación</v-btn>
                            <br>
                            <v-btn class="text-none" variant="tonal" block prepend-icon="mdi-file-pdf-box" @click="showPDF(video)">Descargar PDF</v-btn>
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

// Información del registro de video
const { data: video} = await useFetch(`/api/videos/${route.params._id}`)

// Nombre de la pestaña actual
const tab = ref('identificacion')

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
            lais: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwIAAAK/CAYAAADan3qnAAAACXBIWXMAAC4jAAAuIwF4pT92AAAU5WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcFRQZz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3QvcGcvIiB4bWxuczpzdERpbT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL0RpbWVuc2lvbnMjIiB4bWxuczp4bXBHPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvZy8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwZGZ4PSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZngvMS4zLyIgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIiB4bWxuczppbGx1c3RyYXRvcj0iaHR0cDovL25zLmFkb2JlLmNvbS9pbGx1c3RyYXRvci8xLjAvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBJbGx1c3RyYXRvciBDQyAyMDE3IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDEtMjRUMTQ6NTY6MDktMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMTEtMjVUMTc6NTY6MjAtMDY6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTExLTI1VDE3OjU2OjIwLTA2OjAwIiB4bXBUUGc6TlBhZ2VzPSIxIiB4bXBUUGc6SGFzVmlzaWJsZVRyYW5zcGFyZW5jeT0iRmFsc2UiIHhtcFRQZzpIYXNWaXNpYmxlT3ZlcnByaW50PSJGYWxzZSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOlJlbmRpdGlvbkNsYXNzPSJwcm9vZjpwZGYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjODk1Yzc3Yi1lYzQxLTYxNDMtOTdkOC02YTZkMzlmNTdmMzUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDVmNDMwOTMtYzFiYy00M2NkLThkNTktZjNkMDA0ZDk5MWE4IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Zjg0MGRlNWEtMThhZS1hOTQwLTgzZWMtZTNmNzNkZTA3OGMwIiBwZGZ4OkNyZWF0b3JWZXJzaW9uPSIyMS4wLjIiIHBkZjpQcm9kdWNlcj0iQWRvYmUgUERGIGxpYnJhcnkgMTUuMDAiIGlsbHVzdHJhdG9yOlR5cGU9IkRvY3VtZW50IiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB0aWZmOkltYWdlV2lkdGg9Ijc5MyIgdGlmZjpJbWFnZUxlbmd0aD0iODkzIiB0aWZmOkNvbXByZXNzaW9uPSIxIiB0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb249IjIiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6U2FtcGxlc1BlclBpeGVsPSIzIiB0aWZmOlBsYW5hckNvbmZpZ3VyYXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iNjU1MzUiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI3NzAiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI3MDMiPiA8eG1wVFBnOk1heFBhZ2VTaXplIHN0RGltOnc9IjguMTEzODg5IiBzdERpbTpoPSI4Ljk5NTgzMyIgc3REaW06dW5pdD0iQ2VudGltZXRlcnMiLz4gPHhtcFRQZzpQbGF0ZU5hbWVzPiA8cmRmOlNlcT4gPHJkZjpsaT5DeWFuPC9yZGY6bGk+IDxyZGY6bGk+TWFnZW50YTwvcmRmOmxpPiA8cmRmOmxpPlllbGxvdzwvcmRmOmxpPiA8cmRmOmxpPkJsYWNrPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC94bXBUUGc6UGxhdGVOYW1lcz4gPHhtcFRQZzpTd2F0Y2hHcm91cHM+IDxyZGY6U2VxPiA8cmRmOmxpIHhtcEc6Z3JvdXBOYW1lPSJHcnVwbyBkZSBtdWVzdHJhcyBwb3IgZGVmZWN0byIgeG1wRzpncm91cFR5cGU9IjAiLz4gPC9yZGY6U2VxPiA8L3htcFRQZzpTd2F0Y2hHcm91cHM+IDxkYzp0aXRsZT4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+TEFJUzwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6dGl0bGU+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVkNWZhMWQ2LWQxNWQtNDkzZC1hMWJmLTdjOGJmYzhlMDA3NSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjBhMzJjZDQ0LWExZWQtNGU0Yy04YzIzLTYyMGUyZWVjMjk5ZSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmY4NDBkZTVhLTE4YWUtYTk0MC04M2VjLWUzZjczZGUwNzhjMCIgc3RSZWY6cmVuZGl0aW9uQ2xhc3M9InByb29mOnBkZiIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmODQwZGU1YS0xOGFlLWE5NDAtODNlYy1lM2Y3M2RlMDc4YzAiIHN0RXZ0OndoZW49IjIwMTctMTItMDVUMTQ6MTU6NTItMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIENDIDIwMTcgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ZjM2ZTBiNS1kMjJmLTNhNDktYTM3MS0wZDNkMTE4ZDgxMTUiIHN0RXZ0OndoZW49IjIwMTgtMDEtMjRUMTQ6NTY6MDctMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIENDIDIwMTcgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vcGRmIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvdGlmZiIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjJkMWY5NzAtMzA3YS00YzQwLWFlYzEtYzRkMzk1OTM2MWIzIiBzdEV2dDp3aGVuPSIyMDE5LTExLTE0VDEzOjQyOjQ1LTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTQ5MDI2OWItOGUwNS00NDdlLTllOGYtNGJlZTMwMjZjMmIwIiBzdEV2dDp3aGVuPSIyMDIyLTAyLTIyVDEzOjU4OjQ2LTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3RpZmYgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gaW1hZ2UvdGlmZiB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NThjODRlNS1lNDBmLTQ5NDMtYmI0Ni00OTlhM2EzMTA1YTgiIHN0RXZ0OndoZW49IjIwMjItMDItMjJUMTM6NTg6NDYtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy4xIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ZDVmYTFkNi1kMTVkLTQ5M2QtYTFiZi03YzhiZmM4ZTAwNzUiIHN0RXZ0OndoZW49IjIwMjItMTEtMjVUMTc6NTY6MjAtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowNWY0MzA5My1jMWJjLTQzY2QtOGQ1OS1mM2QwMDRkOTkxYTgiIHN0RXZ0OndoZW49IjIwMjItMTEtMjVUMTc6NTY6MjAtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkxBSVMiIHBob3Rvc2hvcDpMYXllclRleHQ9IkxBSVMiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOjZmMzZlMGI1LWQyMmYtM2E0OS1hMzcxLTBkM2QxMThkODExNTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8dGlmZjpCaXRzUGVyU2FtcGxlPiA8cmRmOlNlcT4gPHJkZjpsaT44PC9yZGY6bGk+IDxyZGY6bGk+ODwvcmRmOmxpPiA8cmRmOmxpPjg8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L3RpZmY6Qml0c1BlclNhbXBsZT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tl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',
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

            // Imagen de referencia
            // video.adicional.imagen ? {text: 'Imagen', style: 'subheader'} : '',
            // video.adicional.imagen ? {image: `public/data/image/${video.adicional.imagen}`, width: 150} : '',
            
            // Fecha de consulta
            {text: `Fecha de consulta: ${dayjs(new Date()).format('DD/MM/YYYY')}.`, fontSize: 10, margin: [0, 10]},
        ],
    }

    // Acción para que el usuario pueda descargar el pdf
    pdfMake.createPdf(docDefinition).download(`${video.identificacion.codigoReferencia}.pdf`)
}
</script>