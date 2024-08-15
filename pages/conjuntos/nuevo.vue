<template>
    <v-card>
        <v-form validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <v-toolbar color="secondary" >
                <v-toolbar-title>Nuevo conjunto documental</v-toolbar-title>
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
                                    <v-text-field v-model="conjunto.identificacion.codigoReferencia" label="Código de referencia" variant="underlined" clearable :rules="formRules.codigoReferencia" ></v-text-field>
                                    <v-text-field v-model="conjunto.identificacion.titulo" label="Título" variant="underlined" clearable :rules="formRules.titulo" ></v-text-field>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.fecha" label="Fecha (periodo)" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.pais" label="País" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-select v-model="conjunto.identificacion.nivelDescripcion" label="Nivel de descripción" variant="underlined" clearable :items="selectLists.nivelDescripcion" ></v-select>
                                        </v-col>

                                    </v-row>

                                    <!-- solo colección -->
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.volumenSoporte" label="Volumen y soporte" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.coordinacion" label="Coordinación" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <!-- solo grupo documental -->
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.proyectoInvestigacion" label="Proyecto de investigación" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.entidadProductora" label="Entidad productora" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.investigacion" label="Investigación" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.coordinacionProyecto" label="Coordinación del proyecto" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.coordinacionProduccionAudiovisual" label="Coordinación del proyecto audiovisual" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="contexto">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.contexto.semblanzaBiografica" label="Semblanza biográfica" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                                
                                <!-- solo colección -->
                                <v-textarea v-model="conjunto.contexto.historiaInstitucional" label="Historia institucional" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                                <v-textarea v-model="conjunto.contexto.historiaArchivistica" label="Historia archivística" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="contenidoEstructura">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.contenidoEstructura.alcanceContenido" label="Alcance y contenido" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                                <v-textarea v-model="conjunto.contenidoEstructura.valoracionSeleccionEliminacion" label="Valoración, selección y eliminación" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                                <!-- solo colección -->
                                <v-textarea v-model="conjunto.contenidoEstructura.nuevosIngresos" label="Nuevos ingresos" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                                <v-textarea v-model="conjunto.contenidoEstructura.organizacion" label="Organización" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="condicionesAccesoUso">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.condicionesAccesoUso.condicionesAcceso" label="Condiciones de acceso" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                                <v-textarea v-model="conjunto.condicionesAccesoUso.condicionesReproduccion" label="Condiciones de reproducción" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="notas">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.notas.notas" label="Notas" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="controlDescripcion">
                        <v-card flat>
                            <v-card-text>
                                <v-text-field v-model="auth.fullname" label="Archivista" variant="underlined" readonly ></v-text-field>
                                <v-text-field v-model="today" label="Fecha de creación" variant="underlined" readonly ></v-text-field>
                                <v-text-field v-model="conjunto.controlDescripcion.reglasNormas" label="Reglas o normas" variant="underlined" ></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="adicional">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.adicional.presentacion" label="Presentación" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                                <v-file-input v-model="files.image" label="Imagen o portada" prepend-icon="mdi-image-outline" :rules="formRules.imagen" accept="image/*" show-size chips ></v-file-input>
                                
                                <v-checkbox v-model="conjunto.adicional.isPublic" label="Registro público" ></v-checkbox>
                                <v-checkbox v-model="conjunto.adicional.isDraft" label="Guardar como borrador" ></v-checkbox>
                            </v-card-text>
                        </v-card>
                    </v-tabs-window-item>
                </v-tabs-window>
            </div>
            <div class="d-flex justify-center">
                <v-btn class="mb-8" color="secondary" size="large" variant="flat" type="submit" :loading="isLoading">Crear conjunto documental</v-btn>
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
        'create',
    ]
})

// Composable para obtener parametros desde URL
const route = useRoute()

// Biblioteca para mostrar fechas
const dayjs = useDayjs()

// Selector de pestaña. Debe coincidir con el prop "value" de <v-tab>
const tab = ref('identificacion')

// Lista de áreas con su identificador, nombre textual e icono. Auxiliar para crear <v-tab>
const areasList = [
    { name: 'identificacion', readName: 'Identificación', icon: 'mdi-file-edit' }, 
    { name: 'contexto', readName: 'Contexto', icon: 'mdi-account-details' }, 
    { name: 'contenidoEstructura', readName: 'Contenido y estructura', icon: 'mdi-image-text' }, 
    { name: 'condicionesAccesoUso', readName: 'Condiciones de acceso y uso', icon: 'mdi-video-input-component' }, 
    { name: 'notas', readName: 'Notas', icon: 'mdi-note' }, 
    { name: 'controlDescripcion', readName: 'Control de la descripción', icon: 'mdi-account' }, 
    { name: 'adicional', readName: 'Información adicional', icon: 'mdi-file-multiple' }, 
]

// Listas textuales para componentes <v-select>
const selectLists = {
    nivelDescripcion: ['Colección', 'Grupo', 'Subgrupo', 'Serie', 'Subserie', 'Unidad compuesta'],
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
})

// Representación del registro de video que será enviado a la base de datos
const conjunto = reactive({
    identificacion: {
        // colección y grupo documental
        codigoReferencia: null,
        pais: null,
        fecha: null,
        nivelDescripcion: null,
        titulo: null,

        // solo colección
        volumenSoporte: null,
        coordinacion: null,

        // solo grupo documental
        proyectoInvestigacion: null,
        entidadProductora: null,
        investigacion: null,
        coordinacionProyecto: null,
        coordinacionProduccionAudiovisual: null,
    },
    contexto: {
        // colección y grupo documental
        semblanzaBiografica: null,
        
        // solo colección
        historiaInstitucional: null,
        historiaArchivistica: null,
    },
    contenidoEstructura: {
        // colección y grupo documental
        alcanceContenido: null,
        valoracionSeleccionEliminacion: null,
        
        // solo colección
        nuevosIngresos: null,
        organizacion: null,
    },
    condicionesAccesoUso: {
        // colección y grupo documental
        condicionesAcceso: null,
        condicionesReproduccion: null,
    },
    notas: {
        notas: null,
    },
    controlDescripcion: {
        // colección y grupo documental
        documentalista: auth?.id || null,

        // solo colección
        reglasNormas: null,
    },
    adicional: {
        imagen: '',
        presentacion: null,
        tipo: null,
        isPublic: true,
        isDraft: false,
        fetchCount: 0,
        parent: route.query?.id || null,
        child: [],
        videos: [],
        depth: 0,
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
    titulo: [
        value => {
            if(value) return true
            return 'El título es necesario'
        },
    ],
    imagen: [
        value => {
            if (!value || value && value.length === 0 || (value && value.length && value[0].size < 1000000)) return true
            return 'El tamaño de la imagen debe ser menor a 1 MB'
        }
    ],
}

// Referencia a formulario (util para funciones de validación)
const form = ref(null)

// Determina si hay validaciones en curso
const isLoading = ref(false)

/**
 * Sube un archivo del cliente al servidor.
 * El archivo a subir debe estar especificado en alguno de los <v-file-input>
 * @param {object} file Archivo subido desde input file
 * @param {string} filetype Tipo de archivo a subir ("video", "image", "document")
 * @param {string} id Id en base de datos del registro
 * @returns {string} El nuevo nombre del archivo subido
 */
async function uploadFile(file, filetype, id) {
    // Validación del parámetro "filetype"
    const valid = /(^video$)|(^image$)|(^document$)/gm.test(filetype)
    if(!valid) return
    
    // Crear un nuevo formulario
    const formData = new FormData()

    // Agregar campos necesarios, incluyendo el archivo. El nombre de cada campo se usará en el API
    formData.append('file', file)
    formData.append('id', id)
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
 * Acciones al dar clic al botón de Crear nuevo conjunto documental.
 * Se realizan validaciones, si todo es correcto se envia información a la base de datos
 */
 async function submit(){
    // Indicar inicio de proceso de subida del conjunto documental
    isLoading.value = true

    // Validación de TODOS los campos del formulario
    const { valid } = await form.value.validate()
    // Si el formulario no es válido, se cancela el proceso
    if (!valid) {
        isLoading.value = false
        return
    }

    // newConjunto es el nuevo registro en base de datos. Incluye propiedad "_id"
    const newConjunto = await $fetch('/api/conjuntos/nuevo', {
        method: 'POST',
        body: JSON.parse(JSON.stringify(conjunto)),
        query: { id: auth?.id }
    })

    // Actualizar referencia del conjunto padre
    if(newConjunto.adicional.parent){
        await $fetch(`/api/conjuntos/hierarchy/${newConjunto.adicional.parent}`, {
            method: 'PUT',
            query: {id: newConjunto._id, type: "conjunto"}
        })
    }

    // Si es un borrador, guardar en listado de borradores del usuario
    if(newConjunto.adicional.isDraft)
        await $fetch(`/api/drafts/conjuntos/user/${auth?.id}`, {
            method: 'PUT',
            body: JSON.parse(JSON.stringify(newConjunto.value)),
        })
    
    // Si existe archivo de imagen, proceder a subirlo
    if(files.image)
        newConjunto.adicional.imagen = await uploadFile(files.image, 'image', newConjunto._id)
    else
        newConjunto.adicional.imagen = null

    // Actualizar nuevas referencias de los archivos subidos
    await $fetch(`/api/conjuntos/${newConjunto._id}`, {
        method: 'PUT',
        body: JSON.parse(JSON.stringify(newConjunto)),
    })

    // Indicar el final del proceso de subida del conjunto documental
    isLoading.value = false
    
    // Concluido el proceso, reenviar a página del conjunto documental
    await navigateTo(`/conjuntos/${newConjunto._id}`)
}
</script>