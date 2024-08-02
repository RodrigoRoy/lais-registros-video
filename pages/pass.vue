<template>
    <p class="mb-6 mt-3 text-h5 text-center text-high-emphasis text-uppercase">You've forgot your password?</p>
    
    <v-container >
        <v-row align="center" style="height: 150px;" no-gutters >
            <v-col align="center">
                <p class="mb-6 text-h6 ">Don't worry! Please insert a correct email to receive a new link to put a new password.</p>
                <v-sheet class="align-center justify-center flex-wrap text-center my-4 mx-auto px-4 bg-accent" elevation="21"  max-width="400" width="100%" rounded="xl" >
                    <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
                        <div class="text-subtitle-1 text-medium-emphasis mb-5">Ingresa tu correo</div>
                            <v-text-field v-model="email" density="compact" type=email label="correo" placeholder="lguerrero@email.com" prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="formRules.email" class="mb-3"></v-text-field>                        
                        <v-btn color="blue" size="large" variant="tonal"  type="submit" :loading="isLoading" >Send</v-btn>
                    </v-form>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
    

</template>

<script setup>

// Referencia a formulario (util para funciones de validación)
const form = ref(null)
const isLoading = ref(false) // determina si hay validaciones en curso
const email = ref('')  // correo electronico

// definePageMeta({
//     middleware: [
//         'auth',
//         'create',
//     ]
// })

// Conjunto de reglas de validación para todos los campos del formulario
const formRules = {
    email: [
        value => {
            if(/^[a-zA-Z0-9\-\_\.]+@.+(\.[a-zA-Z0-9\-]+)+$/gm.test(value)) return true
            return 'Escribe un correo válido'
        }, 
    ],
    
}

async function submit(){
    isLoading.value = true // indicar el comienzo de inicio de sesión
    
    try {
        const { valid } = await form.value.validate() // validaciones del formulario
        if(valid) {
            const user = await $fetch('/api/recover/generate', {
                method: 'PATCH',
                body: {
                    "email": email.value,
                }
            })
            console.log('user:', user)
        }
        isLoading.value = false // indicar el final del inicio de sesión
    } 
    catch (error) {
        throw createError({ statusCode: 400, statusMessage: error})
    }
}



</script>