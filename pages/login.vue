<template>
    <v-card class="mx-auto my-6 pa-12 pb-8" elevation="8" max-width="448" rounded="lg" >

        <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <p class="mb-6 text-h5 text-center text-high-emphasis text-uppercase">Inicio de sesión</p>

            <div class="text-subtitle-1 text-medium-emphasis">Cuenta</div>
            <v-text-field v-model="usuario" density="compact" placeholder="Nombre de usuario o correo" prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="formRules.usuario" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contraseña
                <nuxt-link to="/pass" class="text-caption text-decoration-none text-accent">¿Olvidaste tu contraseña?</nuxt-link>
            </div>
            <v-text-field v-model="password" :append-inner-icon="isPassVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisible ? 'text' : 'password'" density="compact" placeholder="Escribe la contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisible = !isPassVisible" :rules="formRules.password" ></v-text-field>

            <v-btn class="mb-8" color="primary" size="large" variant="flat" block type="submit" :loading="isLoading" >Iniciar sesión</v-btn>

            <v-card-text class="text-center">
                <nuxt-link class="text-accent text-decoration-none" to="/registro">Crear cuenta <v-icon icon="mdi-chevron-right"></v-icon></nuxt-link>
            </v-card-text>
        </v-form>

    </v-card>
</template>

<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
const auth = useAuthStore()
const message = useMessageStore()

definePageMeta({
    middleware: [
        'no-auth',
    ]
})

const form = ref(null) // Referencia a formulario (util para funciones de validación)
const usuario = ref('') // Username/email
const password = ref('') // Password (texto simple)

const isLoading = ref(false) // determina si hay validaciones en curso
const isPassVisible = ref(false) // determina si la contraseña es visible

// Conjunto de reglas de validación para todos los campos del formulario
const formRules = {
    usuario: [
        value => {
            if (value) return true
            return 'Usuario o email es necesario'
        },
    ],
    password: [
        value => {
            if (value) return true
            return 'La contraseña es necesaria'
        },
    ]
}

/**
 * Acciones al dar clic al botón de Iniciar sesión.
 * Se realizan validaciones, si todo es correcto se inicia sesión y se envia a la página inicial
 */
async function submit(){
    isLoading.value = true // indicar el comienzo de inicio de sesión
    
    try {
        const { valid } = await form.value.validate() // validaciones del formulario
        if(valid) {
            await auth.login(usuario.value, password.value) // petición al API con datos del usuario
            await navigateTo('/') // ir a página de inicio
        }
        else{
            message.show({text: 'Usuario y/o contraseña incorrecta', color: 'error'})
        }
    } 
    catch (error) {
        message.show({text: 'Usuario y/o contraseña incorrecta', color: 'error'})
    } 
    finally {
        isLoading.value = false // indicar el final del inicio de sesión
    }
}
</script>