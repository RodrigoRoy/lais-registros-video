<template>
    <v-card class="mx-auto my-6 pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

        <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <p class="mb-6 text-h5 text-center text-high-emphasis text-uppercase">Registro</p>
            
            <div class="text-subtitle-1 text-medium-emphasis">Nombre completo</div>
            <v-text-field v-model="fullname" density="compact" placeholder="Rodrigo Colín" prepend-inner-icon="mdi-badge-account" variant="outlined" :rules="formRules.fullname" ></v-text-field>
            
            <div class="text-subtitle-1 text-medium-emphasis">Correo</div>
            <v-text-field v-model="email" density="compact" type="email" placeholder="rodrigo@gmail.com" prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="formRules.email" ></v-text-field>
            
            <div class="text-subtitle-1 text-medium-emphasis">Nombre de usuario</div>
            <v-text-field v-model="name" density="compact" placeholder="Rodrigo123" prepend-inner-icon="mdi-account" variant="outlined" :rules="formRules.usuario" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contraseña
            </div>
            <v-text-field v-model="password" :append-inner-icon="isPassVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisible ? 'text' : 'password'" density="compact" placeholder="********" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisible = !isPassVisible" :rules="formRules.password" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Confirmar contraseña
            </div>
            <v-text-field v-model="passwordConfirm" :append-inner-icon="isPassVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisibleConfirm ? 'text' : 'password'" density="compact" placeholder="********" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisibleConfirm = !isPassVisibleConfirm" :rules="formRules.passwordConfirm" ></v-text-field>

            <v-btn class="mb-8 mt-4" color="primary" size="large" variant="flat" block type="submit" :loading="isLoading" >Registrar</v-btn>

            <v-card-text class="text-center">
                <nuxt-link class="text-accent text-decoration-none" to="/login">¿Ya te registraste? Iniciar sesión <v-icon icon="mdi-chevron-right"></v-icon> </nuxt-link>
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
const name = ref('') // username
const fullname = ref('')  // nombre real 
const email = ref('')  // correo electronico
const password = ref('') // Password (texto simple)
const passwordConfirm = ref('') // confirmar contraseña

const isLoading = ref(false) // determina si hay validaciones en curso
const isPassVisible = ref(false) // determina si la contraseña es visible
const isPassVisibleConfirm = ref(false) // determina si la contraseña es visible

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
            return 'Nombre es necesario'
        }
    ],
    email: [
        value => {
            if(/^[a-zA-Z0-9\-\_\.]+@.+(\.[a-zA-Z0-9\-]+)+$/gm.test(value)) return true
            return 'Escribe un correo válido'
        }, 
    ],
    password: [
        value => {
            if (value) return true
            return 'La contraseña es necesaria.'
        },
        value => {
            if (value?.length >= 8) return true
            return 'La contraseña debe contener al menos 8 caracteres.'
        },
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
 * Acciones al dar clic al botón de Registrar
 * Se realizan validaciones, si todo es correcto se registra y se envia a la página de login
 */
async function submit(){
    isLoading.value = true // indicar el comienzo de inicio de sesión
    
    try {
        const { valid } = await form.value.validate() // validaciones del formulario
        if(valid) {
            // Creación de nuevo usuario
            await $fetch('/api/usuarios/nuevo', {
                method: 'POST',
                body: {
                    "name": name.value,
                    "fullname": fullname.value,
                    "email": email.value,
                    "password": password.value
                }
            })

            // Mostrar mensaje al usuario
            message.show({text: 'Registro exitoso', color: 'success', location: 'top'})
            await new Promise(resolve => setTimeout(resolve, 2500)) // Simulación de 3 segundos de espera

            // Iniciar sesión con la información dada
            await auth.login(name.value, password.value)
            
            // Ir a página inicial
            await navigateTo('/')
        }
    } 
    catch (error) {
        message.show({text: 'Error al guardar. Por favor inténtalo más tarde', color: 'error'})
    } 
    finally {
        isLoading.value = false // indicar el final del inicio de sesión
    }
}
</script>