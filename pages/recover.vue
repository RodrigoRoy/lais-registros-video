<template>
    <p class="mt-4 text-h5 text-center text-high-emphasis text-uppercase">Cambiar contraseña</p>
    
    <v-container >
        <v-row align="center" style="height: 150px;" no-gutters >
            <v-col align="center">
                <!-- <p class="text-subtitle-1 text-medium-emphasis">Escribe y confirma una nueva contraseña.</p> -->
                <v-sheet class="align-center justify-center flex-wrap text-center my-4 mx-auto px-4 bg-accent" max-width="450" width="100%" color="transparent">
                    <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
                        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                            Nueva contraseña
                        </div>
                        <v-text-field v-model="password" :append-inner-icon="isPassVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisible ? 'text' : 'password'" density="compact" placeholder="Escribe la contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisible = !isPassVisible" :rules="formRules.password" ></v-text-field>

                        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                            Confirmar nueva contraseña
                        </div>
                        <v-text-field v-model="passwordConfirm" :append-inner-icon="isPassVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisibleConfirm ? 'text' : 'password'" density="compact" placeholder="Confirma la contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisibleConfirm = !isPassVisibleConfirm" :rules="formRules.passwordConfirm" ></v-text-field>            

                        <v-btn color="primary" size="large" variant="tonal"  type="submit" :loading="isLoading" class="mt-2">Enviar</v-btn>
                    </v-form>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

definePageMeta({
    middleware: [
        'recover',
    ]
})

// Composable para obtener parametros desde URL
const route = useRoute()

// Referencia a formulario (util para funciones de validación)
const form = ref(null)
const isLoading = ref(false) // determina si hay validaciones en curso
const password = ref('') // Password (texto simple)
const passwordConfirm = ref('') // confirmar contraseña
const isPassVisible = ref(false) // determina si la contraseña es visible
const isPassVisibleConfirm = ref(false) // determina si la contraseña es visible

// Conjunto de reglas de validación para todos los campos del formulario
const formRules = {
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
 * Realiza la petición de cambio de contraseña.
 * Si la información es válida, se realiza el cambio, se inicia sesión
 * y se navega a la página personal del usuario.
 */
async function submit(){
    isLoading.value = true
    const { valid } = await form.value.validate() // validaciones del formulario
    
    try {
        if(valid) {
            // Cambio de contraseña
            const user = await $fetch('/api/recover/newPass', {
                method: 'PATCH',
                body: {
                    user: route.query?.u,
                    id: route.query?.id,
                    password: password.value,
                }
            })
            // Iniciar sesión con nueva contraseña
            await auth.login(user.name, password.value)
            
            // Reenviar a página de usuario
            navigateTo(`/usuarios/${user._id}`)
        }
        isLoading.value = false
    } 
    catch (error) {
        throw createError({ statusCode: 400, statusMessage: error})
    }
}



</script>