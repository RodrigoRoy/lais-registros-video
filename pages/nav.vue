<template>
    <v-container>
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="(item, i) in conjunto.adicional.child" :key="item._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <nav-card :data="item" :revealId="revealId" @delete="refresh"></nav-card>
            </v-col>
        </v-row>
    </v-container>
    <br>
    Conjunto
    <br>
    {{ conjunto }}
</template>


<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Composable para obtener parametros desde URL
const route = useRoute()

const { data: conjunto } = await useFetch('/api/nav', { query: { id: route.query?.id } })

// Auxiliar para determinar el v-card del cual se desea ver más información
const revealId = ref(null)

/**
 * Reload data using native Nuxt util function
 */
 async function refresh(){
    await refreshNuxtData()
}
</script>