<template>
    <h1 class="text-h3 pa-6 ma-2">
        Página personal
    </h1>
    <v-card>
        <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250" max-width="800" width="100%" rounded >
            <div>
                <h2 class="font-weight-black">
                    <h4>Nombre: {{ auth.name }} </h4>
                    <h4>Usuario: {{ auth.fullname }}</h4>
                    <h4>Correo: {{ auth.email }}</h4>
                    <span v-show="auth.isAdmin">Eres admin</span> <!-- si es admin, saldrá el asterisco -->
                </h2>
            </div>
        </v-sheet>
    </v-card>
    
</template>

<script setup>
    import { useAuthStore } from '@/stores/auth'
    const auth = useAuthStore()
</script>