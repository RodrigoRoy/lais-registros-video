<template>
    <v-container>
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="(conjunto, i) in conjuntos" :key="conjunto._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <conjunto-card :conjunto="conjunto" :revealId="revealId" @delete-conjunto="refresh"></conjunto-card>
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

// Auxiliar para determinar el v-card del cual se desea ver más información
const revealId = ref(null)

/**
 * Reload data using native Nuxt util function
 */
 async function refresh(){
    await refreshNuxtData()
}
</script>