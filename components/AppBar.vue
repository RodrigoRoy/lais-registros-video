<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
const website = useWebsiteStore()
const auth = useAuthStore()

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

<template>
    <v-app-bar elevation="4" rounded>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="website.toggleDrawer()"></v-app-bar-nav-icon>
        </template>
        
        <v-app-bar-title>Registros en video</v-app-bar-title>

        <!-- Vista alternativa con botones para iniciar y cerrar sesión -->
        <!-- <template v-slot:append>
            <v-btn v-if="!auth.isLoggedIn" append-icon="mdi-login" variant="tonal">Entrar</v-btn>
            <v-btn v-if="auth.isLoggedIn" append-icon="mdi-logout" variant="tonal" @click="cerrarSesion()">Salir</v-btn>
        </template> -->
        
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-horizontal-circle-outline" v-bind="props"></v-btn>
            </template>
            <v-list v-if="!auth.isLoggedIn">
                <v-list-item>
                    <v-list-item-title>
                        <nuxt-link to="/login">
                            <v-btn color="primary" variant="plain" append-icon="mdi-login" >
                                Iniciar sesión
                            </v-btn>
                        </nuxt-link>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <nuxt-link to="/registro">
                            <v-btn color="primary" variant="plain" append-icon="mdi-account-plus" >
                                Crear cuenta
                            </v-btn>
                        </nuxt-link>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn color="primary" variant="plain" append-icon="mdi-logout" @click="cerrarSesion()">
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