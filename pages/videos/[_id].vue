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
                                            <p class="text-body-1">{{ $dayjs(video.identificacion.fecha).format('DD/MM/YYYY') }}</p>
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
                                            <p class="text-body-1 font-weight-medium text-accent">Persona entrevistada</p>
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
                            <div v-if="video.condicionesAccesoUso?.idiomaOriginal || video.condicionesAccesoUso?.soporte || video.condicionesAccesoUso?.numeroCasetes || video.condicionesAccesoUso?.color || video.condicionesAccesoUso?.audio || video.condicionesAccesoUso?.resolucionGrabacion || video.condicionesAccesoUso?.formatoVideoDigital || video.condicionesAccesoUso?.requisitosTecnicos" class="mt-2 mb-4">
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
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.resolucionGrabacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Resolución de grabación</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.resolucionGrabacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="video.condicionesAccesoUso?.formatoVideoDigital">
                                            <p class="text-body-1 font-weight-medium text-accent">Formato de video digital</p>
                                            <p class="text-body-1">{{ video.condicionesAccesoUso.formatoVideoDigital }}</p>
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

            <!-- Video y estadísticas -->
            <v-col cols="12" md="4" align="center">
                <v-sheet class="pa-2 ma-2" color="background">
                        <v-card elevation="2" height="auto" width="auto" variant="flat">
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

                <!-- Descarga de documentos -->
                <v-sheet class="pa-2 ma-2" color="background">
                        <v-card elevation="2" height="auto" width="auto" variant="flat">
                            <v-btn v-if="video.adicional.documentoCalificacion" class="text-none" variant="flat" block prepend-icon="mdi-file-document" :href="getDocumentURL(video.adicional.documentoCalificacion)">Documento de calificación</v-btn>
                            <dev-only>
                                <video-pdf :data="video"></video-pdf>
                            </dev-only>
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