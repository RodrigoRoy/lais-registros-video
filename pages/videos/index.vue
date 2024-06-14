<template>
    <v-container>
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="(video, i) in videos" :key="video._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <video-card :video="video" :revealId="revealId" @delete-video="refresh"></video-card>
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

// Auxiliar para determinar el v-card del cual se desea ver más información
const revealId = ref(null)

/**
 * Reload data using native Nuxt util function
 */
 async function refresh(){
    await refreshNuxtData()
}
</script>