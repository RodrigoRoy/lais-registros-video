<template>
    <v-container>
        <v-row>
            <!-- Mostrar cuadricula de elementos -->
            <v-col v-for="video in videos" :key="video._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <nav-card type="video" :data="video" color="secondary" @delete="refresh"></nav-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Lista de registros en video
const { data: videos } = await useFetch('/api/videos') // reasignación de variable 'data' a 'videos'

/**
 * Reload data using native Nuxt util function
 */
 async function refresh(){
    await refreshNuxtData()
}
</script>