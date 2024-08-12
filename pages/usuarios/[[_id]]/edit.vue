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

            <!-- Cambio de contraseña. Apertura de formulario en dialog -->
            <v-dialog v-model="showDialog"> 
                <template v-slot:activator="{ props: activatorProps }"> 
                    <v-btn v-bind="activatorProps" prepend-icon="mdi-key" class="text-subtitle-1 text-decoration-none" color="info">
                        Cambiar contraseña
                    </v-btn>
                </template>
                <v-container>
                    <v-row align="center" no-gutters >
                        <v-col align="center">
                            <v-sheet class="align-center justify-center flex-wrap text-center my-4 mx-auto pa-6" max-width="450" width="100%">
                                <div class="text-h4 mb-6">Cambio de contraseña</div>
                                <v-form fast-fail validate-on="submit lazy" @submit.prevent="changePassword" ref="passwordForm">
                                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                                        Contraseña actual
                                    </div>
                                    <v-text-field v-model="actualPassword" :append-inner-icon="isActualVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isActualVisible ? 'text' : 'password'" density="compact" placeholder="" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isActualVisible = !isActualVisible"  ></v-text-field>
                                    
                                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                                        Nueva contraseña
                                    </div>
                                    <v-text-field v-model="password" :append-inner-icon="isPassVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisible ? 'text' : 'password'" density="compact" placeholder="" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisible = !isPassVisible" :rules="formRules.password"></v-text-field>

                                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                                        Confirmar nueva contraseña
                                    </div>
                                    <v-text-field v-model="passwordConfirm" :append-inner-icon="isPassVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisibleConfirm ? 'text' : 'password'" density="compact" placeholder="" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisibleConfirm = !isPassVisibleConfirm" :rules="formRules.passwordConfirm"></v-text-field>            

                                    <v-btn color="info" size="large" variant="tonal" type="submit" :loading="isLoadingPassword" class="mt-2">Enviar</v-btn>
                                </v-form>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>
            </v-dialog>


            <div class="mt-4 text-subtitle-1 text-medium-emphasis">Imagen de perfil</div>
            <div v-if="usuario.profileImage">
                <nuxt-img class="align-center text-white" height="100" :src="`/data/profile/${usuario.profileImage}`" fit="cover" />
                <br />
                <v-btn variant="tonal" color="error" size="small" @click="usuario.profileImage = null">Borrar imagen</v-btn>
            </div>
            <v-file-input v-else v-model="files.profileImage" label="Imagen de perfil" prepend-icon="mdi-account-box" :rules="formRules.profileImage" accept="image/*" show-size chips ></v-file-input>
            
            <div v-if="auth.isAdmin" class="text-subtitle-1 text-medium-emphasis mt-4">Permisos
                <v-switch class="font-weight-bold mb-4" v-model="usuario.admin" color="primary" label="Administración"  hide-details></v-switch>
                <v-switch v-model="usuario.operation.create" color="primary" label="Creación de registros"  hide-details></v-switch>
                <v-switch v-model="usuario.operation.update" color="primary" label="Actualización de registros"  hide-details></v-switch>
                <v-switch v-model="usuario.operation.delete" color="primary" label="Borrado de registros"  hide-details></v-switch>
                <v-switch class="mt-4" v-model="usuario.active" color="primary" label="Perfil activo"  hide-details></v-switch>
            </div>
            
            <v-btn class="mb-8 mt-4" color="blue" size="large" variant="tonal" block type="submit" :loading="isLoading" >Actualizar</v-btn>
            
            <v-snackbar :timeout="timeout" :color="snackbarColor" v-model="showSnackbar">
                <p class="text-center font-weight-bold">{{ snackbarText }}</p>
            </v-snackbar>
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
    ]
})

// Composable para obtener parametros desde URL
const route = useRoute()

// Información del usuario
const { data: usuario } = await useFetch(`/api/usuarios/${route.params._id}`)

const form = ref(null) // Referencia a formulario (util para funciones de validación)
const passwordForm = ref(null) // Referencia a formulario (util para funciones de validación)
const isLoading = ref(false) // determina si hay validaciones en curso
const isLoadingPassword = ref(false) // determina si hay validaciones al cambiar contraseña

const showSnackbar = ref(false) // determina si muestra el snackbar/mensaje de aviso (alerta)
const snackbarColor = ref("success")
const snackbarText = ref("Registro exitoso") // texto en el snackbar

const showDialog = ref(false)
const timeout = ref(3000)

const actualPassword = ref('') // confirmar contraseña
const password = ref('') // Password (texto simple)
const passwordConfirm = ref('') // confirmar contraseña
const isActualVisible = ref(false) // determina si la contraseña es visible
const isPassVisibleConfirm = ref(false) // determina si la contraseña es visible
const isPassVisible = ref(false) // determina si la contraseña es visible

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
    password: [
        value => {
            if (value) return true
            return 'La contraseña es necesaria.'
        },
        value => {
            if (value?.length >= 8) return true
            return 'La contraseña debe contener al menos 8 caracteres.'
        },  // TODO Agregrar validaciones de caracteres,numeros, mayus
        value => {
            if(/^.*[0-9A-Z]+.*$/gm.test(value)) return true
            return 'La contraseña debe tener al menos un número y una letra en mayúscula.'
        },
        value => {
            if(/^.*[A-Z]+.*$/gm.test(value)) return true
            return 'La contraseña debe tener al menos una letra en mayúscula.'
        },
        value => {
            if(/^.*[0-9]+.*$/gm.test(value)) return true
            return 'La contraseña debe tener al menos un número.'
        },
    ],
    passwordConfirm: [
        value => {
            if (value) return true
            return 'La contraseña es necesaria'
        },
        value => {
            if (value == password.value) return true
            return 'Las contraseñas deben coincidir.'
        },
    ],
}

/**
 * Cambia la contraseña del usuario al proveer la contraseña actual y una nueva.
 */
async function changePassword(){
    isLoadingPassword.value = true
    
    try {
        const { valid: passwordFormValid } = await passwordForm.value.validate() // validaciones del formulario
        // Si el formulario no es válido, se detiene el proceso
        if (!passwordFormValid) {
            isLoadingPassword.value = false
            return
        }
        
        // Petición de actualización a base de datos
        await $fetch('/api/recover/changePass', {
            method: 'PATCH', 
            body: {
                id: usuario.value._id,
                password: actualPassword.value,
                newPassword: password.value
            },
        })

        // Cerrar dialog
        showDialog.value = false
        passwordForm.value.reset()

        // Actualizar token
        await auth.updateToken()
        
        // Mostrar mensaje de contraseña guardada
        showSnackbar.value = true
        snackbarColor.value = "success"
        snackbarText.value = "Contraseña actualizada"
        await new Promise(resolve => setTimeout(resolve, timeout.value))
    } 
    catch (error) {
        // Cerrar dialog
        // showDialog.value = false

        // Mostrar mensaje de error
        showSnackbar.value = true
        snackbarColor.value = "error"
        snackbarText.value = "Contraseña incorrecta"
    } 
    finally {
        isLoadingPassword.value = false // indicar el final del inicio de sesión
    }

}

/**
 * Sube un archivo del cliente al servidor, en este caso, la imagen de perfil.
 * El archivo a subir debe estar especificado en alguno de los <v-file-input>
 * @param {object} file Archivo subido desde input file
 * @returns {string} El nuevo nombre del archivo subido
 */
 async function uploadFile(file) {
    // Crear un nuevo formulario
    const formData = new FormData()

    // Agregar campos necesarios, incluyendo el archivo. El nombre de cada campo se usará en el API
    formData.append('file', file)
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
        if(usuario.value._id && files.profileImage)
            usuario.value.profileImage = await uploadFile(files.profileImage)
        else if(!usuario.value.profileImage) // contempla el caso en que el video exista pero no se actualiza
            usuario.value.profileImage = null
        
        // Petición de actualización a base de datos
        await useFetch(`/api/usuarios/${route.params._id}`, {
            method: 'PUT',
            body: usuario
        })

        // Mostrar mensaje de actualización de perfil exitoso
        showSnackbar.value = true
        snackbarColor.value = "success"
        snackbarText.value = "Perfil actualizado"
        await new Promise(resolve => setTimeout(resolve, timeout.value))

        // si es tu propio perfil, actualizar token
        if(auth.id === route.params._id)
            await auth.updateToken()

        await navigateTo(`/usuarios/${route.params._id}`) // ir a página del usuario
    } 
    catch (error) {
        // Mostrar mensaje de error
        showSnackbar.value = true
        snackbarColor.value = "error"
        snackbarText.value = "Error para guardar. Por favor inténtalo más tarde."
    } 
    finally {
        isLoading.value = false
    }

}
</script>