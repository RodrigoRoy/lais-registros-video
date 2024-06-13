<template>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

        <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <p class="font-weight-bold  mb-6 text-h5 text-center text-high-emphasis text-uppercase">Edición del perfil</p>
            
            <div class="text-subtitle-1 text-medium-emphasis">Nombre completo</div>
            <v-text-field :disabled="auth.isAdmin && auth.id !== usuario._id" v-model="usuario.fullname" density="compact" :placeholder="usuario.fullname"  prepend-inner-icon="mdi-badge-account" variant="outlined" :rules="formRules.fullname" ></v-text-field>
            
            <div class="text-subtitle-1 text-medium-emphasis">Correo</div>
            <v-text-field :disabled="auth.isAdmin && auth.id !== usuario._id" v-model="usuario.email" density="compact" :placeholder="usuario.email" prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="formRules.email" ></v-text-field>
            
            <div class="text-subtitle-1 text-medium-emphasis">Nombre de usuario</div>
            <v-text-field :disabled="auth.isAdmin && auth.id !== usuario._id" v-model="usuario.name" density="compact" :placeholder="usuario.name" prepend-inner-icon="mdi-account" variant="outlined" :rules="formRules.usuario" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Imagen de perfil</div>
            <div v-if="usuario.profileImage">
                <nuxt-img class="align-center text-white" height="100" :src="`/data/profile/${usuario.profileImage}`" fit="cover" />
                <br />
                <v-btn variant="tonal" color="error" size="small" @click="usuario.profileImage = null">Cambiar portada</v-btn>
            </div>
            <v-file-input v-else v-model="files.profileImage" label="Imagen de perfil" prepend-icon="mdi-account-box" :rules="formRules.profileImage" accept="image/*" show-size chips ></v-file-input>
            
            <div v-if="auth.isAdmin" class="text-subtitle-1 text-medium-emphasis">Permisos
                <v-switch class="font-weight-bold mb-4" v-model="usuario.admin" color="primary" label="Administración"  hide-details></v-switch>
                <v-switch v-model="usuario.operation.create" color="primary" label="Creación de registros"  hide-details></v-switch>
                <v-switch v-model="usuario.operation.update" color="primary" label="Actualización de registros"  hide-details></v-switch>
                <v-switch v-model="usuario.operation.delete" color="primary" label="Borrado de registros"  hide-details></v-switch>
                <v-switch class="mt-4" v-model="usuario.active" color="primary" label="Perfil activo"  hide-details></v-switch>
            </div>
            
            <v-btn class="mb-8 mt-4" color="blue" size="large" variant="tonal" block type="submit" :loading="isLoading" >Actualizar</v-btn>
            
            <v-snackbar timeout="3000" :color="snackbarColor" variant="tonal" v-model="showSnackbar">
                <p class="text-center font-weight-bold">{{ snackbarText }}</p>
            </v-snackbar>
        </v-form>
    </v-card>
</template>

<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Composable para obtener parametros desde URL
const route = useRoute()

// Información del usuario
const { data: usuario } = await useFetch(`/api/usuarios/${route.params._id}`)

const form = ref(null) // Referencia a formulario (util para funciones de validación)

const isLoading = ref(false) // determina si hay validaciones en curso
const showSnackbar = ref(false) // determina si muestra el snackbar/mensaje de aviso (alerta)
const snackbarColor = ref("success")
const snackbarText = ref("Registro exitoso") // texto en el snackbar

// Contenedor de archivos subidos. Se emplean para representar los campos de "Imagen", "Clip de video" y "Documento de calificación"
const files = reactive({
    profileImage: null,
})

// Conjunto de reglas de validación para todos los campos del formulario
const formRules = {
    usuario: [
        value => {
            if (value) return true
            return 'Usuario es necesario'
        }
    ],
    fullname: [
        value => {
            if (value) return true
            return 'Nombre completo es necesario'
        }
    ],
    profileImage: [
        value => {
            if (!value || value && value.length === 0 || (value && value.length && value[0].size < 1000000)) return true
            return 'El tamaño de la imagen debe ser menor a 1 MB'
        }
    ],
}

/**
 * Sube un archivo del cliente al servidor, en este caso, la imagen de perfil.
 * El archivo a subir debe estar especificado en alguno de los <v-file-input>
 * @returns {string} El nuevo nombre del archivo subido
 */
 async function uploadFile() {
    // Crear un nuevo formulario
    const formData = new FormData()

    // Agregar campos necesarios, incluyendo el archivo. El nombre de cada campo se usará en el API
    formData.append('file', files.profileImage[0])
    formData.append('id', usuario.value._id)

    // Petición al API para procesar la información del formulario
    const {filename} = await $fetch('/api/files/profileImage', {
        method: 'POST',
        body: formData
    })

    // Devuelve el nuevo nombre del archivo subido
    return filename
}

/**
 * Acciones al dar clic al botón de Registrar
 * Se realizan validaciones, si todo es correcto se registra y se envia a la página de login
 */
async function submit(){
    isLoading.value = true // indicar el comienzo de inicio de sesión
    
    try {
        const { valid } = await form.value.validate() // validaciones del formulario
        // Si el formulario no es válido, se cancela el proceso
        if (!valid) {
            isLoading.value = false
            return
        }

        // Subir imagen de perfil, en caso de estar establecida
        if(usuario.value._id && files.profileImage && files.profileImage[0])
            usuario.value.profileImage = await uploadFile()
        else if(!usuario.value.profileImage) // contempla el caso en que el video exista pero no se actualiza
            usuario.value.profileImage = null
        
        // Petición de actualización a base de datos
        await useFetch(`/api/usuarios/${route.params._id}`, {
            method: 'PUT',
            body: usuario
        })
        snackbarColor.value = "success"
        snackbarText.value = "Perfil actualizado"
        showSnackbar.value = true // indicar que el registro fue exitoso
        await new Promise(resolve => setTimeout(resolve, 3000)) // Simulación de 3 segundos de espera

        // si es tu propio perfil, actualizar token
        if(auth.id === route.params._id)
            await auth.updateToken()

        await navigateTo(`/usuarios/${route.params._id}`) // ir a página del usuario
    } 
    catch (error) {
        snackbarColor.value = "error"
        showSnackbar.value = true
        snackbarText.value = "Hubo un error"
        throw createError({ statusCode: 400, statusMessage: error})
    } 
    finally {
        isLoading.value = false // indicar el final del inicio de sesión
    }

}
</script>