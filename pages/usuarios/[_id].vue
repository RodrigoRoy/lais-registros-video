<template>
    <h4 class="text-h4 pa-6 ma-2">
        Página personal
    </h4>
    <v-card>
        <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250" max-width="800" width="100%" rounded >
            <div>
                <h2 class="font-weight-black">
                    <h4>Nombre: {{ user.name }} </h4>
                    <h4>Usuario: {{ user.fullname }}</h4>
                    <h4>Correo: {{ user.email }}</h4>
                    <span v-if="user.admin">Eres admin</span> <!-- si es admin, saldrá el asterisco -->
                </h2>
            </div>
        </v-sheet>
    </v-card>
</template>

<script setup>
// Nota: descomentar middleware para incluir restricciones de acceso, comentar para pruebas rápidas
// definePageMeta({
//     middleware: [
//         'auth',
//     ]
// })

// Composable para obtener parametros desde URL
const route = useRoute()

// Información del usuario
const user = await $fetch(`/api/usuarios/${route.params._id}`)
</script>