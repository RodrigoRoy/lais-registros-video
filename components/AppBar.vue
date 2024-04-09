<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
const website = useWebsiteStore()
const auth = useAuthStore()
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
                <v-list-item active="false">
                    <v-list-item-title>
                        <v-btn color="primary" variant="plain" disabled>
                            Crear cuenta
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item active="false">
                    <v-list-item-title>
                        <v-btn color="primary" variant="plain" disabled>
                            Página personal
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item active="false" v-show="auth.isAdmin">
                    <v-list-item-title>
                        <v-btn color="primary" variant="plain" disabled>
                            Administración
                        </v-btn>
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
                        <v-btn color="primary" variant="plain" @click="auth.logout()">
                            Cerrar sesión
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>