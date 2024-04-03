<template>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

        <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <p class="mb-6 text-h5 text-center text-high-emphasis text-uppercase">Inicio de sesión</p>

            <div class="text-subtitle-1 text-medium-emphasis">Cuenta</div>
            <v-text-field v-model="usuario" density="compact" placeholder="Nombre de usuario o correo" prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="formRules.usuario" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contraseña
                <nuxt-link class="text-caption text-decoration-none text-blue">¿Olvidaste tu contraseña?</nuxt-link>
            </div>
            <v-text-field v-model="password" :append-inner-icon="isPassVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisible ? 'text' : 'password'" density="compact" placeholder="Escribe la contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisible = !isPassVisible" :rules="formRules.password" ></v-text-field>
            
            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block type="submit" :loading="isLoading" >Iniciar sesión</v-btn>

            <v-card-text class="text-center">
                <nuxt-link class="text-blue text-decoration-none" >Crear cuenta <v-icon icon="mdi-chevron-right"></v-icon> </nuxt-link>
            </v-card-text>
        </v-form>

    </v-card>
</template>

<script setup>
// State manager
import { useUserStore } from '@/stores/user'
const user = useUserStore()

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
        // Se pueden agregar más reglas de validación. El orden de las reglas es importante
        // value => {
        //     if (!/\d+/gm.test(value)) return true
        //     return 'El nombre de usuario no puede contener números.'
        // }
    ],
    password: [
        value => {
            if (value) return true
            return 'La contraseña es necesaria'
        },
        // Se pueden agregar más reglas de validación. El orden de las reglas es importante
        // value => {
        //     if (value?.length >= 3) return true
        //     return 'La contraseña debe contener al menos 3 caracteres.'
        // }
    ]
}

/**
 * Acciones al dar clic al botón de Iniciar sesión.
 * Se realizan validaciones, si todo es correcto se inicia sesión y se envia a la página inicial
 */
async function submit(){
    isLoading.value = true // indicar el comienzo de inicio de sesión
    await new Promise(resolve => setTimeout(resolve, 3000)) // Simulación de 3 segundos de espera
    
    try {
        const { valid } = await form.value.validate() // validaciones del formulario
        if(valid) {
            await user.login(usuario.value, password.value) // petición al API con datos del usuario
            await navigateTo('/') // ir a página de inicio
        }
    } 
    catch (error) {
        throw createError({ statusCode: 400, statusMessage: error})
    } 
    finally {
        isLoading.value = false // indicar el final del inicio de sesión
    }

}
</script>