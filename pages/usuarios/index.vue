<template>
    <v-container>
        <v-row>
            <h4 class="text-h4 pa-6 ma-2">
                Lista de usuarios
            </h4>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4" xl="3" v-for="usuario in usuarios" :key="usuario._id">
                <user-card :user="usuario" @delete-user="refresh" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
definePageMeta({
    middleware: [
        'auth',
        'admin',
    ]
})

// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Datos de los usuarios
const { data: usuarios } = await useFetch('/api/usuarios')

/**
 * Reload data using native Nuxt util function
 */
async function refresh(){
    await refreshNuxtData()
}
</script>
