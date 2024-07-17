<template>
    <v-card>
        <v-form validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <v-toolbar color="primary" >
                <v-toolbar-title>Nuevo registro de video</v-toolbar-title>
            </v-toolbar>
            
            <div class="d-flex flex-row">
                <v-tabs v-model="tab" color="primary" direction="vertical" >
                    <v-tab v-for="area in areasList" :value="area.name">
                        <v-icon start>
                            {{ area.icon }}
                        </v-icon>
                        <p class="text-body-2 font-weight-medium text-uppercase">{{ area.readName }}</p>
                    </v-tab>
                </v-tabs>
    
                <v-window v-model="tab" class="w-100">
                    <v-window-item value="identificacion">
                        <v-card flat>
                            <v-card-text>
                                
                                <v-container class="px-0">
                                    <v-text-field v-model="video.identificacion.codigoReferencia" label="Código de referencia" variant="underlined" clearable :rules="formRules.codigoReferencia" ></v-text-field>
                                    <v-row>
                                        <v-col xs="12" lg="6">
                                            <v-date-picker v-model="video.identificacion.fecha" title="Fecha" ></v-date-picker>
                                        </v-col>
                                        <v-col xs="12" lg="6">
                                            <v-text-field v-model="video.identificacion.lugar" label="Lugar" variant="underlined" clearable ></v-text-field>
                                            <v-text-field v-model="video.identificacion.pais" label="País" variant="underlined" clearable ></v-text-field>
                                            <v-text-field v-model="video.identificacion.duracion" label="Duración" type="number" min="1" variant="underlined" clearable :rules="formRules.duracion" ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="video.identificacion.personasEntrevistadas" label="Personas entrevistadas" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col md="6">
                                            <v-text-field v-model="video.identificacion.entrevista" label="Entrevista" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="video.identificacion.camara" label="Cámara" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="video.identificacion.iluminacion" label="Iluminación" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="video.identificacion.asistencia" label="Asistencia" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="video.identificacion.sonido" label="Sonido" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="contenidoEstructura">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="video.contenidoEstructura.descripcionGeneral" label="Descripción general" variant="underlined" clearable rows="5" auto-grow ></v-textarea>
                                <v-select v-model="video.contenidoEstructura.estructuraFormal" label="Estructura formal" variant="underlined" clearable :items="selectLists.estructuraFormal" ></v-select>
                                <v-container class="px-0">
                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="video.contenidoEstructura.descriptorOnomastico" label="Descriptor onomástico" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="video.contenidoEstructura.descriptorToponimico" label="Descriptor toponímico" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="condicionesAccesoUso">
                        <v-card flat>
                            <v-card-text>
                                <v-container class="px-0">
                                    <v-row>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-text-field v-model="video.condicionesAccesoUso.idiomaOriginal" label="Idioma original" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-text-field v-model="video.condicionesAccesoUso.numeroCasetes" label="Número de casetes" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-text-field v-model="video.condicionesAccesoUso.requisitosTecnicos" label="Requisitos técnicos" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.soporte" label="Soporte" variant="underlined" clearable :items="selectLists.soporte" ></v-select>
                                        </v-col>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.color" label="Color" variant="underlined" clearable :items="selectLists.color" ></v-select>
                                        </v-col>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.audio" label="Audio" variant="underlined" clearable :items="selectLists.audio" ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.sistemaGrabacion" label="Sistema de grabación" variant="underlined" clearable :items="selectLists.sistemaGrabacion" ></v-select>
                                        </v-col>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.resolucionGrabacion" label="Resolución de grabación" variant="underlined" clearable :items="selectLists.resolucionGrabacion" ></v-select>
                                        </v-col>
                                        <v-col xs="12" sm="12" md="4">
                                            <v-select v-model="video.condicionesAccesoUso.formatoVideoDigital" label="Formato de video digital" variant="underlined" clearable :items="selectLists.formatoVideoDigital" ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="documentacionAsociada">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="video.documentacionAsociada.unidadesDescripcionRelacionadas" label="Unidades de descripción relacionadas" variant="underlined" clearable rows="3" auto-grow ></v-textarea>
                                <v-textarea v-model="video.documentacionAsociada.documentosAsociados" label="Documentos asociados" variant="underlined" clearable rows="3" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="notas">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="video.notas.notas" label="Notas" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="controlDescripcion">
                        <v-card flat>
                            <v-card-text>
                                <v-text-field v-model="auth.fullname" label="Archivista" variant="underlined" readonly ></v-text-field>
                                <v-text-field v-model="today" label="Fecha de creación" variant="underlined" readonly ></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="adicional">
                        <v-card flat>
                            <v-card-text>
                                <v-file-input v-model="files.video" label="Archivo de video" prepend-icon="mdi-file-video-outline" :rules="formRules.clipVideo" accept="video/*" show-size chips ></v-file-input>
                                <v-file-input v-model="files.image" label="Imagen o portada" prepend-icon="mdi-image-outline" :rules="formRules.imagen" accept="image/*" show-size chips ></v-file-input>
                                <v-file-input v-model="files.document" label="Documento de calificación" prepend-icon="mdi-file-document-outline" :rules="formRules.documentoCalificacion" accept=".pdf" show-size chips ></v-file-input>
                                
                                <v-checkbox v-model="video.adicional.isPublic" label="Registro público" ></v-checkbox>
                                <v-checkbox v-model="video.adicional.isDraft" label="Guardar como borrador" ></v-checkbox>
                                
                                <!-- Mapa interactivo (Leaflet) -->
                                <p class="text-overline">Ubicación</p>
                                <l-map style="height: 300px" :zoom="map.zoom" :center="map.center" :options="map.options" ref="leafletMap">
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
                    </v-window-item>
                </v-window>
            </div>
            <div class="d-flex justify-center">
                <v-btn class="mb-8" color="primary" size="large" variant="tonal" type="submit" :loading="isLoading">Crear registro de video</v-btn>
            </div>
        </v-form>
    </v-card>
</template>

<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

definePageMeta({
    middleware: [
        'auth',
        'create',
    ]
})

// Biblioteca para mostrar fechas
const dayjs = useDayjs()

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

// Representación del registro de video que será enviado a la base de datos
const video = reactive({
    identificacion: {
        codigoReferencia: null,
        fecha: new Date(),
        lugar: null,
        pais: null,
        duracion: null,
        personasEntrevistadas: null,
        entrevista: null,
        camara: null,
        iluminacion: null,
        asistencia: null,
        sonido: null,
    },
    contenidoEstructura: {
        descripcionGeneral: null,
        estructuraFormal: null,
        descriptorOnomastico: null,
        descriptorToponimico: null,
    },
    condicionesAccesoUso: {
        idiomaOriginal: null,
        soporte: null,
        numeroCasetes: null,
        color: null,
        audio: null,
        sistemaGrabacion: null,
        resolucionGrabacion: null,
        formatoVideoDigital: null,
        requisitosTecnicos: null,
    },
    documentacionAsociada: {
        unidadesDescripcionRelacionadas: null,
        documentosAsociados: null,
    },
    notas: {
        notas: null,
    },
    controlDescripcion: {
        documentalista: auth?.id || null,
    },
    adicional: {
        updates: [],
        imagen: '',
        clipVideo: '',
        documentoCalificacion: '',
        location: {
            lat: null,
            lng: null,
        },
        isPublic: true,
        isDraft: false,
        bookmarkedBy: [],
        fetchCount: 0,
        playCount: 0,
    },
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
    center: [19.37651880288312, -99.18512156842415], // Instituto Mora
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
 * Sube un archivo del cliente al servidor.
 * El archivo a subir debe estar especificado en alguno de los <v-file-input>
 * @param {object} file Archivo subido desde input file
 * @param {string} filetype Representa el tipo de archivo a subir ("video", "image", "document")\
 * @returns {string} El nuevo nombre del archivo subido
 */
async function uploadFile(file, filetype) {
    // Validación del parámetro "filetype"
    const valid = /(^video$)|(^image$)|(^document$)/gm.test(filetype)
    if(!valid) return
    
    // Crear un nuevo formulario
    const formData = new FormData()

    // Agregar campos necesarios, incluyendo el archivo. El nombre de cada campo se usará en el API
    formData.append('file', file)
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
 * Acciones al dar clic al botón de Crear nuevo registro de video.
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
    if(video.identificacion.codigoReferencia && files.video)
        video.adicional.clipVideo = await uploadFile(files.video, 'video')
    else
        video.adicional.clipVideo = null

    // Si existe archivo de imagen, proceder a subirlo
    if(video.identificacion.codigoReferencia && files.image)
        video.adicional.imagen = await uploadFile(files.image, 'image')
    else
        video.adicional.imagen = null

    // Si existe documento de texto, proceder a subirlo
    if(video.identificacion.codigoReferencia && files.document)
        video.adicional.documentoCalificacion = await uploadFile(files.document, 'document')
    else
        video.adicional.documentoCalificacion = null

    // newVideo es el nuevo registro en base de datos. Incluye propiedad "_id"
    const newVideo = await $fetch('/api/videos/nuevo', {
        method: 'POST',
        body: JSON.parse(JSON.stringify(video)),
        query: { id: auth?.id},
    })

    // Si es un borrador, guardar en listado de borradores del usuario
    if(video.adicional.isDraft)
        await $fetch(`/api/drafts/user/${auth?.id}`, {
            method: 'PUT',
            body: JSON.parse(JSON.stringify(newVideo)),
        })
    
    // Indicar el final del proceso de subida del registro de video
    isLoading.value = false
    
    // Concluido el proceso, reenviar a página del registro de video
    await navigateTo(`/videos/${newVideo._id}`)
}
</script>