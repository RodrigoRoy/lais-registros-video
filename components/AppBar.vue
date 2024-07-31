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
        <v-btn prepend-icon="mdi-magnify" variant="text" @click="dialog = true">Búsqueda</v-btn>

        <!-- Ventana de búsqueda -->
        <v-dialog v-model="dialog" width="auto" >
            <v-card>
                <!-- Área para escribir búsqueda -->
                <template v-slot:title>
                    <v-text-field v-model="searchQuery" @keyup="search(searchQuery)" prepend-inner-icon="mdi-magnify" label="Búsqueda..." variant="solo-filled" density="comfortable" :hide-details="true" :autofocus="true" :focused="true" :single-line="true"></v-text-field>
                </template>
                <!-- Presentación de resultados -->
                <template v-slot:text>
                    <user-data-table :videos="queryResults" />
                </template>
            </v-card>
        </v-dialog>

        <!-- Vista alternativa con botones para iniciar y cerrar sesión -->
        <!-- <template v-slot:append>
            <v-btn v-if="!auth.isLoggedIn" append-icon="mdi-login" variant="tonal">Entrar</v-btn>
            <v-btn v-if="auth.isLoggedIn" append-icon="mdi-logout" variant="tonal" @click="cerrarSesion()">Salir</v-btn>
        </template> -->
        
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn v-if="!auth.isLoggedIn" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                <v-btn v-else variant="plain" append-icon="mdi-logout" @click="cerrarSesion()" style="text-decoration: none; color: inherit">
                    Cerrar sesión
                </v-btn>
            </template>
            <v-list v-if="!auth.isLoggedIn">
                <v-list-item>
                    <v-list-item-title>
                        <v-btn variant="plain" append-icon="mdi-login">
                            <nuxt-link to="/login" style="text-decoration: none; color: inherit">
                                Iniciar sesión
                            </nuxt-link>
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn variant="plain" append-icon="mdi-account-plus">
                            <nuxt-link to="/registro" style="text-decoration: none; color: inherit">
                                Crear cuenta
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