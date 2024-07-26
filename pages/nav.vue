<template>
    <breadcrumbs :items="breadcrumbsItems"></breadcrumbs>
    <v-container>
        <conjunto-header :conjunto="data" color="primary" variant="flat" class="mb-6" ></conjunto-header>
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="(item, i) in data.adicional.child" :key="item._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <nav-card type="conjunto" :data="item" :revealId="revealId" color="teal-darken-4" :nav="true" @delete="refresh"></nav-card>
            </v-col>

            <v-col v-for="(item, i) in data.adicional.videos" :key="item._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <nav-card type="video" :data="item" :revealId="revealId" color="lime-darken-4" :nav="true" @delete="refresh"></nav-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Composable para obtener parametros desde URL
const route = useRoute()

const { data } = await useFetch('/api/nav', { query: { id: route.query?.id } })
const { data: breadcrumbsItems} = await useFetch('/api/breadcrumbs', { query: { id: route.query?.id, disable: true } } )

// Auxiliar para determinar el v-card del cual se desea ver más información
const revealId = ref(null)

/**
 * Reload data using native Nuxt util function
 */
 async function refresh(){
    await refreshNuxtData()
}

// Verificar cambios en URL
watch(
    () => route.fullPath,
    async (fullPath) => {
        const newConjunto = await $fetch('/api/nav', { query: { id: route.query?.id } })
        conjunto.value = newConjunto
        const newBreadcrumbs = await $fetch('/api/breadcrumbs', { query: { id: route.query?.id } } )
        breadcrumbsItems.value = newBreadcrumbs
    },
    { inmediate: true }
)
</script>