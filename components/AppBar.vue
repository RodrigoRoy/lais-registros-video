<template>
    <v-app-bar elevation="4" rounded color="primary">
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
        <v-menu> <!-- scrim="secondary" -->
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
</template>

<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
const website = useWebsiteStore()
const auth = useAuthStore()
const message = useMessageStore()

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

/**
 * Cierra sesión del usuario activo
 */
async function cerrarSesion(){
    message.show({text: 'Cerrando sesión', color: 'info', loading: true, timeout: 2000})
    await new Promise(resolve => setTimeout(resolve, 2500))
    auth.logout()
    message.show({text: 'Sesión cerrada', color: 'success', timeout: 2000})
}
</script>