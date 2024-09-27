<template>
    <p class="mt-4 text-h5 text-center text-high-emphasis text-uppercase">Restaurar contraseña</p>
    
    <v-container >
        <v-row align="center" style="height: 150px;" no-gutters >
            <v-col align="center">
                <!-- <p class="mb-6 text-h6">Ingresa tu correo electrónico para restaurar tu contraseña.</p> -->
                <v-sheet class="align-center justify-center flex-wrap text-center my-4 mx-auto px-4 bg-accent" max-width="450" width="100%" color="transparent">
                    <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
                        <div class="text-subtitle-1 text-medium-emphasis mb-2">Ingresa tu correo electrónico para restaurar tu contraseña</div>
                        <v-text-field v-model="email" density="compact" type=email label="Correo electrónico" prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="formRules.email"></v-text-field>
                        <v-btn color="primary" size="large" variant="tonal" type="submit" :loading="isLoading" class="mt-2">Enviar</v-btn>
                    </v-form>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
// State manager
import { useMessageStore } from '@/stores/message'
const message = useMessageStore()

definePageMeta({
    middleware: [
        'no-auth',
    ]
})

// Biblioteca para mostrar fechas
const dayjs = useDayjs()

// Referencia a formulario (util para funciones de validación)
const form = ref(null)
const isLoading = ref(false) // determina si hay validaciones en curso
const email = ref('')  // correo electronico

// Conjunto de reglas de validación para todos los campos del formulario
const formRules = {
    email: [
        value => {
            if(/^[a-zA-Z0-9\-\_\.]+@.+(\.[a-zA-Z0-9\-]+)+$/gm.test(value)) return true
            return 'Escribe un correo válido'
        }, 
    ],
}

/**
 * Se genera solicitud de recuperación y se avisa al usuario que
 * complete el proceso revisando su correo electrónico.
 */
async function submit(){
    isLoading.value = true
    const { valid } = await form.value.validate() // validaciones del formulario

    try {
        if(valid) {
            // Generar petición de recuperación del usuario
            const user = await $fetch('/api/recover/generate', {
                method: 'PATCH',
                body: {
                    'email': email.value,
                    'expire': dayjs().add(1, 'day')
                }
            })
            
            // Obtener URL de recuperación
            const response = await $fetch(`/api/recover/${user._id}`, { method: 'GET' })
            
            // Enviar la ruta de recuperación por correo electrónico
            if(response){
                await $fetch('/api/recover/mail', {method: 'POST', body: {username: response.username, email: response.email, url: response.url}})
                message.show({text: 'Por favor revisa tu correo electrónico para concluir.', color: 'info'})
                await navigateTo({ path: '/' })
            }
        }
        isLoading.value = false
    } 
    catch (error) {
        throw createError({ statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
}
</script>