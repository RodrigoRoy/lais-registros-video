<template>
    <breadcrumbs :items="breadcrumbsItems"></breadcrumbs>
    <v-container>
        <nav-header :data="conjunto" :color="conjunto.adicional?.videos?.length ? 'secondary' : 'primary'" variant="flat" class="mb-6"></nav-header>
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="item in conjunto.adicional.child" :key="item._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <nav-card type="conjunto" :data="item" color="primary" nav @delete="refresh"></nav-card>
            </v-col>

            <v-col v-for="item in conjunto.adicional.videos" :key="item._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <nav-card type="video" :data="item" color="secondary" nav @delete="refresh"></nav-card>
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

const { data: conjunto } = await useFetch('/api/nav', { query: { id: route.query?.id } })
const { data: breadcrumbsItems} = await useFetch('/api/breadcrumbs', { query: { id: route.query?.id, disable: true } } )

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
        conjunto.value = await $fetch('/api/nav', { query: { id: route.query?.id } })
        breadcrumbsItems.value = await $fetch('/api/breadcrumbs', { query: { id: route.query?.id } } )
    },
    { inmediate: true }
)
</script>