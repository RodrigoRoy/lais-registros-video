<template>
    <v-card>
        <v-form validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <v-toolbar color="secondary" >
                <v-toolbar-title>Editar registro de video <span class="text-body-1">({{ video.identificacion.codigoReferencia }})</span></v-toolbar-title>
            </v-toolbar>
            
            <!-- d-flex flex-row permite mostrar tabs en vertical. Solo para tamaños mdAndUp -->
            <div :class="{'d-flex': !smAndDown, 'flex-row': !smAndDown}">
                <v-tabs v-model="tab" color="secondary" :direction="smAndDown ? 'horizontal' : 'vertical'" :show-arrows="smAndDown" center-active>
                    <v-tab v-for="area in areasList" :value="area.name">
                        <v-icon start>
                            {{ area.icon }}
                        </v-icon>
                        <p class="text-body-2 font-weight-medium text-uppercase">{{ area.readName }}</p>
                    </v-tab>
                </v-tabs>
    
                <v-tabs-window v-model="tab" class="w-100">
                    <v-tabs-window-item value="identificacion">
                        <v-card flat>
                            <v-card-text>
                                
                                <v-container class="px-0">
                                    <v-text-field v-model="video.identificacion.codigoReferencia" label="Código de referencia" variant="underlined" :rules="formRules.codigoReferencia" readonly></v-text-field>
                                    <v-row>
                                        <v-col cols="12" lg="6">
                                            <v-date-picker v-model="video.identificacion.fecha" title="Fecha"></v-date-picker>
                                        </v-col>
                                        <v-col cols="12" lg="6">
                                            <v-text-field v-model="video.identificacion.lugar" label="Lugar" variant="underlined" clearable ></v-text-field>
                                            <v-text-field v-model="video.identificacion.pais" label="País" variant="underlined" clearable ></v-text-field>
                                            <v-text-field v-model="video.identificacion.duracion" label="Duración" type="number" min="1" variant="underlined" clearable :rules="formRules.duracion" ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="video.identificacion.personasEntrevistadas" label="Personas entrevistadas" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="video.identificacion.entrevista" label="Entrevista" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="video.identificacion.camara" label="Cámara" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="video.identificacion.iluminacion" label="Iluminación" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="video.identificacion.asistencia" label="Asistencia" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="video.identificacion.sonido" label="Sonido" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="contenidoEstructura">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="video.contenidoEstructura.descripcionGeneral" label="Descripción general" variant="underlined" clearable rows="5" auto-grow ></v-textarea>
                                <v-select v-model="video.contenidoEstructura.estructuraFormal" label="Estructura formal" variant="underlined" clearable :items="selectLists.estructuraFormal" ></v-select>
                                <v-container class="px-0">
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="video.contenidoEstructura.descriptorOnomastico" label="Descriptor onomástico" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="video.contenidoEstructura.descriptorToponimico" label="Descriptor toponímico" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="condicionesAccesoUso">
                        <v-card flat>
                            <v-card-text>
                                <v-container class="px-0">
                                    <v-row>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-text-field v-model="video.condicionesAccesoUso.idiomaOriginal" label="Idioma original" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-text-field v-model="video.condicionesAccesoUso.numeroCasetes" label="Número de casetes" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-text-field v-model="video.condicionesAccesoUso.requisitosTecnicos" label="Requisitos técnicos" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.soporte" label="Soporte" variant="underlined" clearable :items="selectLists.soporte" ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.color" label="Color" variant="underlined" clearable :items="selectLists.color" ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.audio" label="Audio" variant="underlined" clearable :items="selectLists.audio" ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.sistemaGrabacion" label="Sistema de grabación" variant="underlined" clearable :items="selectLists.sistemaGrabacion" ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.resolucionGrabacion" label="Resolución de grabación" variant="underlined" clearable :items="selectLists.resolucionGrabacion" ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.formatoVideoDigital" label="Formato de video digital" variant="underlined" clearable :items="selectLists.formatoVideoDigital" ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="documentacionAsociada">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="video.documentacionAsociada.unidadesDescripcionRelacionadas" label="Unidades de descripción relacionadas" variant="underlined" clearable rows="3" auto-grow ></v-textarea>
                                <v-textarea v-model="video.documentacionAsociada.documentosAsociados" label="Documentos asociados" variant="underlined" clearable rows="3" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="notas">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="video.notas.notas" label="Notas" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="controlDescripcion">
                        <v-card flat>
                            <v-card-text>
                                <v-text-field v-model="video.controlDescripcion.documentalista.fullname" label="Archivista" variant="underlined" readonly ></v-text-field>
                                <v-text-field v-model="createdAt" label="Fecha de creación" variant="underlined" readonly ></v-text-field>
                                <v-text-field v-model="today" label="Fecha de actualización" variant="underlined" readonly ></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="adicional">
                        <v-card flat>
                            <v-card-text>
                                <div class="mx-2 mb-6" v-if="video.adicional?.clipVideo">
                                    <p class="text-body-1">Archivo de video</p>
                                    <video controls width="auto" height="250" >
                                        <source :src="`/data/video/${video.adicional.clipVideo}`" />
                                    </video>
                                    <br />
                                    <v-btn variant="tonal" color="error" size="small" @click="video.adicional.clipVideo = null">Cambiar video</v-btn>
                                </div>
                                <v-file-input v-else v-model="files.video" label="Archivo de video" prepend-icon="mdi-file-video-outline" :rules="formRules.clipVideo" accept="video/*" show-size chips ></v-file-input>
                                
                                <div class="mx-2 mb-6" v-if="video.adicional?.imagen">
                                    <p class="text-body-1">Imagen o portada</p>
                                    <nuxt-img class="align-center text-white" height="250" :src="`/data/image/${video.adicional.imagen}`" placeholder fit="cover" />
                                    <br />
                                    <v-btn variant="tonal" color="error" size="small" @click="video.adicional.imagen = null">Cambiar portada</v-btn>
                                </div>
                                <v-file-input v-else v-model="files.image" label="Imagen o portada" prepend-icon="mdi-image-outline" :rules="formRules.imagen" accept="image/*" show-size chips ></v-file-input>
                                
                                <div class="mx-2 mb-6" v-if="video.adicional?.documentoCalificacion">
                                    <p class="text-body-1">Documento de calificación</p>
                                    <p><a :href="`/data/document/${video.adicional.documentoCalificacion}`" target="_blank"><v-icon icon="mdi-file-pdf-box"></v-icon> {{ video.adicional.documentoCalificacion }}</a></p>
                                    <v-btn variant="tonal" color="error" size="small" @click="video.adicional.documentoCalificacion = null">Cambiar documento</v-btn>
                                </div>
                                <v-file-input v-else v-model="files.document" label="Documento de calificación" prepend-icon="mdi-file-document-outline" :rules="formRules.documentoCalificacion" accept=".pdf" show-size chips ></v-file-input>
                                
                                <v-checkbox v-model="video.adicional.isPublic" label="El registro de video es público" ></v-checkbox>
                                <v-checkbox v-model="video.adicional.isDraft" label="Guardar registro de video como borrador" ></v-checkbox>

                                <!-- Mapa interactivo (Leaflet) -->
                                <p class="text-overline">Ubicación</p>
                                <l-map style="height: 300px" :zoom="map.zoom" :center="map.center" :options="map.options" ref="leafletMap" @ready="mapReady">
                                    <!-- Capa principal que muestra el mapa -->
                                    <l-tile-layer :url="map.url" attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors" layer-type="base" name="OpenStreetMap" />
                                    <!-- Capa para mostrar botones con acciones personalidas -->
                                    <l-control position="bottomleft">
                                        <!-- Botón para agregar marcador -->
                                        <v-btn @click="addMarker" v-if="!map.marker.visible" icon="mdi-map-marker-plus" variant="elevated" color="success"></v-btn>
                                        <!-- Botón para borrar marcador -->
                                        <v-btn @click="removeMarker" v-if="map.marker.visible" icon="mdi-map-marker-remove" variant="elevated" color="error"></v-btn>
                                    </l-control>
                                    <!-- Capa para mostrar el marcador que representa la ubicación -->
                                    <l-marker :lat-lng="map.marker.latLng" :draggable="map.marker.draggable" layer-type="overlay" :visible="map.marker.visible" ref="leafletMarker" @dragend="markerDragEnd" />
                                </l-map>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>
                </v-tabs-window>
            </div>
            <div class="d-flex justify-center">
                <v-btn class="mb-8" color="secondary" size="large" variant="flat" type="submit" :loading="isLoading">Editar registro de video</v-btn>
            </div>
        </v-form>
    </v-card>
</template>

<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Identifica tamaños de viewport (ventana)
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()

definePageMeta({
    middleware: [
        'auth',
        'update',
    ]
})

// Composable para obtener parametros desde URL
const route = useRoute()

// Biblioteca para mostrar fechas
const dayjs = useDayjs()

// Información del video
const data = await $fetch(`/api/videos/${route.params._id}`)
// Versión reactiva del video (shallow copy)
const video = reactive({...data})
// Parsing para fecha (convertir de string a date)
video.identificacion.fecha = video.identificacion.fecha ? new Date(video.identificacion.fecha) : null
// Editar listado de archivistas que han editado el registro
video.adicional.updates = getUpdatedDocumentalistasList(video.adicional.updates, auth.id)
// Auxiliar temporal para mostrar fecha de creación
const createdAt = dayjs(video.createdAt).format('DD/MM/YYYY HH:mm')

// Selector de pestaña. Debe coincidir con el prop "value" de <v-tab>
const tab = ref('identificacion')

// Lista de áreas con su identificador, nombre textual e icono. Auxiliar para crear <v-tab>
const areasList = [
    { name: 'identificacion', readName: 'Identificación', icon: 'mdi-file-edit' }, 
    { name: 'contenidoEstructura', readName: 'Contenido y estructura', icon: 'mdi-image-text' }, 
    { name: 'condicionesAccesoUso', readName: 'Condiciones de acceso y uso', icon: 'mdi-video-input-component' }, 
    { name: 'documentacionAsociada', readName: 'Documentación asociada', icon: 'mdi-vector-link' }, 
    { name: 'notas', readName: 'Notas', icon: 'mdi-note' }, 
    { name: 'controlDescripcion', readName: 'Control de la descripción', icon: 'mdi-account' }, 
    { name: 'adicional', readName: 'Información adicional', icon: 'mdi-file-multiple' }, 
]

// Listas textuales para componentes <v-select>
const selectLists = {
    estructuraFormal: ['Grabación en campo', 'Registro con entrevista', 'Registro de materiales', 'Entrevista controlada', 'Entrevista en campo', 'Entrevista con imágenes', 'Entrevista con acción'],
    soporte: ['Betacam', 'Hi8', 'DVCAM', 'MiniDV', 'Archivo digital'],
    color: ['Color', 'Blanco y negro'],
    audio: ['Dolby', 'Dolby Digital', 'Estéreo', 'Estéreo mezclado', 'Monoaural', 'Mono'],
    sistemaGrabacion: ['NTSC', 'PAL', 'SECAM'],
    resolucionGrabacion: ['UHD 8K', 'UHD 4K', 'HD 1080p', 'HD 1080i', 'HD 720', 'HD 720p', 'HD 720i', 'PAL 576i', 'NTSC 480i'],
    formatoVideoDigital: ['MP4', 'MTS', 'AVCHD', 'MOV', 'XAVC'],
}

// Auxiliar para mostrar "Fecha de creación"
const today = dayjs().format('DD/MM/YYYY HH:mm')

// Contenedor de archivos subidos. Se emplean para representar los campos de "Imagen", "Clip de video" y "Documento de calificación"
const files = reactive({
    image: null,
    video: null,
    document: null,
})

// Conjunto de reglas de validación para todos los campos del formulario
const formRules = {
    codigoReferencia: [
        value => {
            if (value) return true
            return 'El código de referencia es necesario'
        },
    ],
    duracion: [
        value => {
            if (/\d+/gm.test(value)) return true
            return 'La duración debe ser un número que representa los minutos'
        }
    ],
    imagen: [
        value => {
            if (!value || value && value.length === 0 || (value && value.length && value[0].size < 1000000)) return true
            return 'El tamaño de la imagen debe ser menor a 1 MB'
        }
    ],
    clipVideo: [
        value => {
            if (!value || value && value.length === 0 || (value && value.length && value[0].size < 9000000)) return true
            return 'El tamaño del video debe ser menor a 9 MB'
        }
    ],
    documentoCalificacion: [
        value => {
            if (!value || value && value.length === 0 || (value && value.length && value[0].size < 1000000)) return true
            return 'El tamaño del video debe ser menor a 1 MB'
        }
    ],
}

// Referencia a formulario (util para funciones de validación)
const form = ref(null)

// Determina si hay validaciones en curso
const isLoading = ref(false)

// Referencia al mapa (para usar funciones del objeto Map)
const leafletMap = ref(null)
// Referencia al marcador del mapa (para usar funciones del objeto Marker)
const leafletMarker = ref(null)
// Configuraciones del mapa
const map = reactive({
    zoom: 11,
    center: [19.37651880288312, -99.18512156842415],
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // Default value for OpenStreetMaps
    options: {
        zoomControl: true,
        attributionControl: true,
        zoomSnap: true,
        scrollWheelZoom: true,
    },
    marker: {
        latLng: [19.37651880288312, -99.18512156842415],
        visible: false,
        draggable: true,
    },
})

/**
 * Agrega el marcador al mapa, usando como ubicación el centro del mapa.
 */
function addMarker(){
    // Copiar coordenadas de la vista actual
    const { lat, lng } = leafletMap.value.leafletObject.getCenter()
    // Actualizar la ubicación del marcador
    map.marker.latLng = [lat, lng]
    
    // Copiar información al registro de video
    video.adicional.location.lat = lat
    video.adicional.location.lng = lng

    // Visibilizar la capa del marcador
    map.marker.visible = true
}

/**
 * Borra el marcador del mapa.
 */
function removeMarker(){
    // Borrar la información de ubicación del registro de video
    video.adicional.location.lat = null
    video.adicional.location.lng = null
    
    // Ocultar la capa del marcador
    map.marker.visible = false
}

/**
 * Acciones a realizar para el evento @dragend del marcador.
 * Actualiza los datos de ubicación en el registro de video.
 */
function markerDragEnd(){
    video.adicional.location.lat = leafletMarker.value.leafletObject._latlng.lat
    video.adicional.location.lng = leafletMarker.value.leafletObject._latlng.lng
}

/**
 * Acciones a realizar cuando el mapa está cargado y listo.
 * Recuperar coordenadas guardadas y en caso de existir,
 * asignar variables para que el mapa se muestre adecuadamente.
 */
function mapReady(){
    if(video.adicional?.location?.lat && video.adicional?.location?.lng){
        map.center = [video.adicional.location.lat, video.adicional.location.lng]
        map.marker.latLng = [video.adicional.location.lat, video.adicional.location.lng]
        map.marker.visible = true
    }
    else{
        video.adicional.location = { lat: null, lng: null }
    }
}

/**
 * Agrega al usuario actual a la lista de actualizaciones
 * @param {[string]} updatesArray Lista de usuarios que han actualizado el registro (adicional.updates)
 * @param {string} idUser Id del usuario que está editando el registro
 * @returns {[string]} Arreglo actualizado y sin repeticiones de (Id's de) usuarios que han editado el registro
 */
function getUpdatedDocumentalistasList(updatesArray, idUser){
    const updates = new Set(updatesArray)
    updates.add(idUser)
    return Array.from(updates)
}

/**
 * Sube un archivo del cliente al servidor.
 * El archivo a subir debe estar especificado en alguno de los <v-file-input>
 * @param {string} filetype Representa el tipo de archivo a subir ("video", "image", "document")\
 * @returns {string} El nuevo nombre del archivo subido
 */
 async function uploadFile(filetype) {
    // Validación del parámetro "filetype"
    const valid = /(^video$)|(^image$)|(^document$)/gm.test(filetype)
    if(!valid) return
    
    // Crear un nuevo formulario
    const formData = new FormData()

    // Agregar campos necesarios, incluyendo el archivo. El nombre de cada campo se usará en el API
    formData.append('file', files[filetype][0])
    formData.append('codigoReferencia', video.identificacion.codigoReferencia)
    formData.append('filetype', filetype)

    // Petición al API para procesar la información del formulario
    const {filename} = await $fetch('/api/files/upload', {
        method: 'POST',
        body: formData
    })

    // Devuelve el nuevo nombre del archivo subido
    return filename
}

/**
 * Acciones al dar clic al botón de confirmación de edición.
 * Se realizan validaciones, si todo es correcto se envia información a la base de datos
 */
 async function submit(){
    // Indicar inicio de proceso de subida del registro de video
    isLoading.value = true

    // Validación de TODOS los campos del formulario
    const { valid } = await form.value.validate()
    // Si el formulario no es válido, se cancela el proceso
    if (!valid) {
        isLoading.value = false
        return
    }

    // Si existe archivo de video, proceder a subirlo
    if(video.identificacion.codigoReferencia && files.video && files.video[0])
        video.adicional.clipVideo = await uploadFile('video')
    else if(!video.adicional.clipVideo) // contempla el caso en que el video exista pero no se actualiza
        video.adicional.clipVideo = null

    // Si existe archivo de imagen, proceder a subirlo
    if(video.identificacion.codigoReferencia && files.image && files.image[0])
        video.adicional.imagen = await uploadFile('image')
    else if(!video.adicional.imagen) // contempla el caso en que la imagen exista pero no se actualiza
        video.adicional.imagen = null

    // Si existe documento de texto, proceder a subirlo
    if(video.identificacion.codigoReferencia && files.document && files.document[0])
        video.adicional.documentoCalificacion = await uploadFile('document')
    else if(!video.adicional.documentoCalificacion) // contempla el caso en que el documento exista pero no se actualiza
        video.adicional.documentoCalificacion = null

    // updatedVideo es el registro actualizado en base de datos
    const updatedVideo = await $fetch(`/api/videos/${video._id}`, {
        method: 'PUT',
        body: JSON.parse(JSON.stringify(video)),
    })

    // Si es un borrador, guardar en listado de borradores del usuario
    if(video.adicional.isDraft)
        await $fetch(`/api/drafts/videos/user/${auth?.id}`, {
            method: 'PUT',
            body: JSON.parse(JSON.stringify(updatedVideo)),
        })
    else // en caso contrario, quitarlo para evitar inconsistencias
        await useFetch(`/api/drafts/videos/user/${auth?.id}`, {
            method: 'DELETE',
            body: JSON.parse(JSON.stringify(updatedVideo))
        })

    // Indicar el final del proceso de subida del registro de video
    isLoading.value = false
    
    // Concluido el proceso, reenviar a página del registro de video
    await navigateTo(`/videos/${updatedVideo._id}`)
}
</script>