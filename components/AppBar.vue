<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
const website = useWebsiteStore()
const auth = useAuthStore()
const showSnackbar1 = ref(false)
const showSnackbar2 = ref(false)
const showSnackbar3 = ref(false)
async function cerrandoSesion(){
    showSnackbar1.value = true
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulación de 3 segundos de espera
    showSnackbar2.value = true
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulación de 3 segundos de espera
    showSnackbar3.value = true
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulación de 3 segundos de espera
    auth.logout()
}
</script>

<template>
    <v-app-bar elevation="4" rounded>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="website.toggleDrawer()"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Registros en video</v-app-bar-title>
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>
            <v-list v-if="!auth.isLoggedIn">
                <v-list-item>
                    <v-list-item-title>
                        <nuxt-link to="/login">
                            <v-btn color="primary" variant="plain">
                                Iniciar sesión
                            </v-btn>
                        </nuxt-link>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <nuxt-link to="/registro">
                            <v-btn color="primary" variant="plain">
                                Crear cuenta
                            </v-btn>
                        </nuxt-link>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item>
                    <v-list-item-title>
                        <nuxt-link to="/">
                            <v-btn color="primary" variant="plain">
                                Página personal
                            </v-btn>
                        </nuxt-link>
                    </v-list-item-title>
                </v-list-item>
                <!-- <v-list-item v-show="auth.isAdmin"> TODO habilitar esto -->
                <v-list-item >
                    <v-list-item-title>
                        <nuxt-link to="/usuarios/all">
                            <v-btn color="primary" variant="plain">
                                Administración
                            </v-btn>
                        </nuxt-link>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <nuxt-link to="/videos/nuevo">
                            <v-btn color="primary" variant="plain">
                                Nuevo registro
                            </v-btn>
                        </nuxt-link>
                    </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn color="primary" variant="plain" @click="cerrandoSesion()">
                                Cerrar sesión
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