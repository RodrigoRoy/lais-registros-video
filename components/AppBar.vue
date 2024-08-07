<template>
    <v-app-bar elevation="4" rounded>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="website.toggleDrawer()"></v-app-bar-nav-icon>
        </template>
        
        <v-app-bar-title>
            <nuxt-link to="/" class="text--primary" style="text-decoration: none; color: inherit">
                Registros en video
            </nuxt-link>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <!-- Barra de búsqueda -->
        <v-btn icon="mdi-magnify" variant="text" @click="dialog = true"></v-btn>

        <!-- Ventana de búsqueda -->
        <v-dialog v-model="dialog" width="100%" scrollable>
            <v-card>
                <!-- Área para escribir búsqueda -->
                <template v-slot:title>
                    <v-text-field placeholder="Búsqueda" v-model="searchQuery" @keyup="search(searchQuery)" prepend-inner-icon="mdi-magnify" variant="solo-filled" density="comfortable" :hide-details="true" :autofocus="true" :focused="true" :single-line="true"></v-text-field>
                </template>
                <!-- Presentación de resultados -->
                <template v-slot:text>
                    <search-items type="video" :max="3" :results="queryResults?.videos" color="secondary" @click-result="dialog = false; searchQuery = ''"></search-items>
                    <search-items type="conjunto" :max="3" :results="queryResults?.conjuntos" color="secondary" @click-result="dialog = false; searchQuery = ''"></search-items>
                </template>
            </v-card>
        </v-dialog>

        <!-- Menú desplegable -->
        <v-menu>
            <!-- Icono para desplegar menú -->
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>
            <!-- Iniciar sesión o crear cuenta -->
            <v-list v-if="!auth.isLoggedIn">
                <v-list-item>
                    <v-list-item-title>
                        <v-btn variant="plain" prepend-icon="mdi-login">
                            <nuxt-link to="/login" style="text-decoration: none; color: inherit">
                                Iniciar sesión
                            </nuxt-link>
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn variant="plain" prepend-icon="mdi-account-plus">
                            <nuxt-link to="/registro" style="text-decoration: none; color: inherit">
                                Crear cuenta
                            </nuxt-link>
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <!-- Cerrar sesión -->
            <v-list v-else>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn variant="plain" prepend-icon="mdi-account">
                            <nuxt-link :to="`/usuarios/${auth.id}`" style="text-decoration: none; color: inherit">
                                Mi perfil
                            </nuxt-link>
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn variant="plain" prepend-icon="mdi-logout" @click="cerrarSesion()">
                            <nuxt-link to="/login" style="text-decoration: none; color: inherit">
                                Cerrar sesión
                            </nuxt-link>
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <v-snackbar timeout=800 color=success variant="tonal" v-model="showSnackbar1">
        <p class="text-center font-weight-bold">Cerrando sesión.</p>
    </v-snackbar>
    <v-snackbar timeout=800 color=success variant="tonal" v-model="showSnackbar2">
        <p class="text-center font-weight-bold">Cerrando sesión..</p>
    </v-snackbar>
    <v-snackbar timeout=800 color=success variant="tonal" v-model="showSnackbar3">
        <p class="text-center font-weight-bold">Cerrando sesión...</p>
    </v-snackbar>
</template>

<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
const website = useWebsiteStore()
const auth = useAuthStore()

// Determina si se muetra el dialogo de búsqueda
const dialog = ref(false)
// Texto de búsqueda
const searchQuery = ref('')
// Resultados de la búsqueda
const { data: queryResults} = await useFetch('/api/search', {query: {q: searchQuery}})

/**
 * Realiza una búsqueda textual en la base de datos
 * @param query Texto a buscar
 */
async function search(query){
    queryResults.value = await $fetch('/api/search', {query: {q: query}})
}

// auxiliar para mostrar mensaje en pantalla
const showSnackbar1 = ref(false)
const showSnackbar2 = ref(false)
const showSnackbar3 = ref(false)

/**
 * Cierra sesión del usuario activo
 */
async function cerrarSesion(){
    // Estrategia para animar mensaje de cierre de sesión:
    showSnackbar1.value = true
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulación de 3 segundos de espera
    showSnackbar2.value = true
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulación de 3 segundos de espera
    showSnackbar3.value = true
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulación de 3 segundos de espera
    
    auth.logout()
}
</script>