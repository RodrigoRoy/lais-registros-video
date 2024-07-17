<template>
    <v-card>
        <v-form validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <v-toolbar color="primary" >
                <v-toolbar-title>Editar conjunto documental <span class="text-body-1">({{ conjunto.identificacion?.titulo }})</span></v-toolbar-title>
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
                                    <v-text-field v-model="conjunto.identificacion.codigoReferencia" label="Código de referencia" variant="underlined" clearable :rules="formRules.codigoReferencia" ></v-text-field>
                                    <v-text-field v-model="conjunto.identificacion.titulo" label="Título" variant="underlined" clearable :rules="formRules.titulo" ></v-text-field>
                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.fecha" label="Fecha (periodo)" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.pais" label="País" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" md="6">
                                            <v-select v-model="conjunto.identificacion.nivelDescripcion" label="Nivel de descripción" variant="underlined" clearable :items="selectLists.nivelDescripcion" ></v-select>
                                        </v-col>

                                    </v-row>

                                    <!-- solo colección -->
                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.volumenSoporte" label="Volumen y soporte" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.coordinacion" label="Coordinación" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <!-- solo grupo documental -->
                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.proyectoInvestigacion" label="Proyecto de investigación" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.entidadProductora" label="Entidad productora" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.investigacion" label="Investigación" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.coordinacionProyecto" label="Coordinación del proyecto" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xs="12" md="6">
                                            <v-text-field v-model="conjunto.identificacion.coordinacionProduccionAudiovisual" label="Coordinación del proyecto audiovisual" variant="underlined" clearable ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="contexto">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.contexto.semblanzaBiografica" label="Semblanza biográfica" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                                
                                <!-- solo colección -->
                                <v-textarea v-model="conjunto.contexto.historiaInstitucional" label="Historia institucional" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                                <v-textarea v-model="conjunto.contexto.historiaArchivistica" label="Historia archivística" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="contenidoEstructura">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.contenidoEstructura.alcanceContenido" label="Alcance y contenido" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                                <v-textarea v-model="conjunto.contenidoEstructura.valoracionSeleccionEliminacion" label="Valoración, selección y eliminación" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                                <!-- solo colección -->
                                <v-textarea v-model="conjunto.contenidoEstructura.nuevosIngresos" label="Nuevos ingresos" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                                <v-textarea v-model="conjunto.contenidoEstructura.organizacion" label="Organización" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="condicionesAccesoUso">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.condicionesAccesoUso.condicionesAcceso" label="Condiciones de acceso" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                                <v-textarea v-model="conjunto.condicionesAccesoUso.condicionesReproduccion" label="Condiciones de reproducción" variant="underlined" clearable rows="2" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="notas">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.notas.notas" label="Notas" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="controlDescripcion">
                        <v-card flat>
                            <v-card-text>
                                <v-text-field v-model="conjunto.controlDescripcion.documentalista.fullname" label="Archivista" variant="underlined" readonly ></v-text-field>
                                <v-text-field v-model="conjunto.controlDescripcion.reglasNormas" label="Reglas o normas" variant="underlined" ></v-text-field>
                                <v-text-field v-model="createdAt" label="Fecha de creación" variant="underlined" readonly ></v-text-field>
                                <v-text-field v-model="today" label="Fecha de actualización" variant="underlined" readonly ></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="adicional">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="conjunto.adicional.presentacion" label="Presentación" variant="underlined" clearable rows="4" auto-grow ></v-textarea>
                                
                                <div class="mx-2 mb-6" v-if="conjunto.adicional?.imagen">
                                    <p class="text-body-1">Imagen o portada</p>
                                    <nuxt-img class="align-center text-white" height="250" :src="`/data/image/${conjunto.adicional.imagen}`" placeholder fit="cover" />
                                    <br />
                                    <v-btn variant="tonal" color="error" size="small" @click="conjunto.adicional.imagen = null">Cambiar portada</v-btn>
                                </div>
                                <v-file-input v-else v-model="files.image" label="Imagen o portada" prepend-icon="mdi-image-outline" :rules="formRules.imagen" accept="image/*" show-size chips ></v-file-input>
                                
                                <v-checkbox v-model="conjunto.adicional.isPublic" label="Registro público" ></v-checkbox>
                                <v-checkbox v-model="conjunto.adicional.isDraft" label="Guardar como borrador" ></v-checkbox>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                </v-window>
            </div>
            <div class="d-flex justify-center">
                <v-btn class="mb-8" color="primary" size="large" variant="tonal" type="submit" :loading="isLoading">Editar registro de video</v-btn>
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
        'edit',
    ]
})

// Composable para obtener parametros desde URL
const route = useRoute()

// Biblioteca para mostrar fechas
const dayjs = useDayjs()

// Información del conjunto documental
const { data: conjunto } = await useFetch(`/api/conjuntos/${route.params._id}`)

const documentalista = conjunto.value.controlDescripcion.documentalista.fullname
// Editar listado de archivistas que han editado el conjunto
conjunto.value.adicional.updates = getUpdatedDocumentalistasList(conjunto.value.adicional.updates, auth.id)
// Auxiliar temporal para mostrar fecha de creación
const createdAt = dayjs(conjunto.value.createdAt).format('DD/MM/YYYY HH:mm')

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
    formData.append('codigoReferencia', conjunto.value.identificacion.codigoReferencia)
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
 * Acciones al dar clic al botón confirmación de edición.
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

    // Si existe archivo de imagen, proceder a subirlo
    if(conjunto.value.identificacion.codigoReferencia && files.image && files.image[0])
        conjunto.value.adicional.imagen = await uploadFile('image')
    else if(!conjunto.value.adicional.imagen) // contempla el caso en que la imagen exista pero no se actualiza
        conjunto.value.adicional.imagen = null

    // updatedConjunto es el registro actualizado en base de datos
    const updatedConjunto = await $fetch(`/api/conjuntos/${route.params._id}`, {
        method: 'PUT',
        body: JSON.parse(JSON.stringify(conjunto.value)),
    })

    // Si es un borrador, guardar en listado de borradores (conjunto) del usuario
    if(conjunto.value.adicional.isDraft)
        await $fetch(`/api/drafts/conjuntos/user/${auth?.id}`, {
            method: 'PUT',
            body: JSON.parse(JSON.stringify(updatedConjunto)),
        })
    else // en caso contrario, quitarlo para evitar inconsistencias
        await useFetch(`/api/drafts/conjuntos/user/${auth?.id}`, {
            method: 'DELETE',
            body: JSON.parse(JSON.stringify(updatedConjunto))
        })

    // Indicar el final del proceso de subida del conjunto doccumental
    isLoading.value = false
    
    // Concluido el proceso, reenviar a página del conjunto doccumental
    await navigateTo(`/conjuntos/${route.params._id}`)
}
</script>