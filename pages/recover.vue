<template>
    <p class="mb-6 mt-3 text-h5 text-center text-high-emphasis text-uppercase">New password</p>
    
    <v-container >
        <v-row align="center" style="height: 150px;" no-gutters >
            <v-col align="center">
                <p class="mb-6 text-h6 ">Put a new password. After, only confirm the last one.</p>
                <v-sheet class="align-center justify-center flex-wrap text-center my-4 mx-auto px-4 bg-accent" elevation="21"  max-width="400" width="100%" rounded="xl" >
                    <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit" ref="form">
                        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                            Contraseña
                        </div>
                        <v-text-field v-model="password" :append-inner-icon="isPassVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisible ? 'text' : 'password'" density="compact" placeholder="Escribe la contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisible = !isPassVisible" :rules="formRules.password" ></v-text-field>

                        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                            Confirmar contraseña
                        </div>
                        <v-text-field v-model="passwordConfirm" :append-inner-icon="isPassVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'" :type="isPassVisibleConfirm ? 'text' : 'password'" density="compact" placeholder="Confirma la contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="isPassVisibleConfirm = !isPassVisibleConfirm" :rules="formRules.passwordConfirm" ></v-text-field>            

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
const password = ref('') // Password (texto simple)
const passwordConfirm = ref('') // confirmar contraseña

// definePageMeta({
//     middleware: [
//         'auth',
//         'create',
//     ]
// })

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

async function submit(){
    isLoading.value = true // indicar el comienzo de inicio de sesión
    
    try {
        const { valid } = await form.value.validate() // validaciones del formulario
        if(valid) {
            // await auth.login(usuario.value, password.value) // petición al API con datos del usuario
            await $fetch('/api/recover/generate', {
                method: 'PATCH',
                body: {
                    "email": email.value,
                }
            })
            
        }
        isLoading.value = false // indicar el final del inicio de sesión
    } 
    catch (error) {
        throw createError({ statusCode: 400, statusMessage: error})
    }
}



</script>