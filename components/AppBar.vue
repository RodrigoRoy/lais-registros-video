<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useUserStore } from '@/stores/user'
const website = useWebsiteStore()
const user = useUserStore()
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
            
            <v-list v-if="!user.isLoggedIn">
                <v-list-item>
                    <v-list-item-title>
                        <v-btn @click="user.login()">
                            Iniciar sesión
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn>
                            Crear usuario
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn>
                            Página personal
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn>
                            Administración
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-title>
                        <v-btn @click="user.logout()">
                            Cerrar sesión
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>