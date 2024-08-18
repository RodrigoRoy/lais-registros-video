<template>
    <v-container>
        <v-row>
            <!-- Mostrar cuadricula de elementos -->
            <v-col v-for="conjunto in conjuntos" :key="conjunto._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <nav-card type="conjunto" :data="conjunto" color="primary" @delete="refresh"></nav-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Lista de conjuntos documentales
const { data: conjuntos } = await useFetch('/api/conjuntos') // reasignación de variable 'data' a 'conjuntos'

/**
 * Reload data using native Nuxt util function
 */
 async function refresh(){
    await refreshNuxtData()
}
</script>