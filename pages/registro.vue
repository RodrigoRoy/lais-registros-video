<template>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

        <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
            <p class="mb-6 text-h5 text-center text-high-emphasis text-uppercase">Registro</p>
            
            <div class="text-subtitle-1 text-medium-emphasis">Usuario</div>
            <v-text-field v-model="name" density="compact" placeholder="Nombre de usuario" prepend-inner-icon="mdi-account" variant="outlined" :rules="formRules.usuario" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Nombre completo</div>
            <v-text-field v-model="fullname" density="compact" placeholder="Nombre real" prepend-inner-icon="mdi-badge-account" variant="outlined" :rules="formRules.fullname" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Correo</div>
            <v-text-field v-model="email" density="compact" placeholder="Correo electrónico" prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="formRules.email" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contraseña
            </div>
            <v-text-field v-model="password" :append-inner-icon="isPassVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisible ? 'text' : 'password'" density="compact" placeholder="Escribe la contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisible = !isPassVisible" :rules="formRules.password" ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Confirmar contraseña
            </div>
            <v-text-field v-model="passwordConfirm" :append-inner-icon="isPassVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisibleConfirm ? 'text' : 'password'" density="compact" placeholder="Confirma la contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisibleConfirm = !isPassVisibleConfirm" :rules="formRules.passwordConfirm" ></v-text-field>
            
            <v-btn class="mb-8 mt-4" color="blue" size="large" variant="tonal" block type="submit" :loading="isLoading" >Registrar</v-btn>

        </v-form>

    </v-card>
</template>

<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

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
            if(/^[a-zA-Z0-9\-\.]+@.+(\.[a-zA-Z0-9\-]+)+$/gm.test(value)) return true
            return 'Escribe un correo válido'
        }
    ],
    password: [
        value => {
            if (value) return true
            return 'La contraseña es necesaria'
        },
        value => {
            if (value?.length > 8) return true
            return 'La contraseña debe contener al menos 8 caracteres.'
        },  // TODO Agregrar validaciones de caracteres,numeros, mayus
    ],
    passwordConfirm: [
        value => {
            if (value) return true
            return 'La contraseña es necesaria'
        },
        value => {
            if (value == password.value) return true
            return 'Las contraseñas deben coincidir.'
        },  // TODO Agregrar validaciones de caracteres,numeros, mayus
    ],
    
}

/**
 * Acciones al dar clic al botón de Registrar
 * Se realizan validaciones, si todo es correcto se registra y se envia a la página de login
 */
async function submit(){
    isLoading.value = true // indicar el comienzo de inicio de sesión
    await new Promise(resolve => setTimeout(resolve, 3000)) // Simulación de 3 segundos de espera
    
    try {
        const { valid } = await form.value.validate() // validaciones del formulario
        if(valid) {
            // await auth.login(usuario.value, password.value) // petición al API con datos del usuario
            $fetch('/api/usuarios/nuevo', {
                method: 'POST',
                body: {
                    "name": name.value,
                    "fullname": fullname.value,
                    "email": email.value,
                    "password": password.value
                }
            })

            await navigateTo('/login') // ir a página de login
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