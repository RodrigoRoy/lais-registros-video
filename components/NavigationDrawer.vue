<template>
    
    <v-navigation-drawer v-model="website.isDrawerVisible" temporary>
        <v-list v-if="auth.isLoggedIn">
            <nuxt-link :to="`/usuarios/${auth.id}`" class="text-decoration-none">
                <v-list-item v-if="auth.profileImage" :title="auth.fullname" :subtitle="auth.email" :prepend-avatar="`/data/profile/${auth.profileImage}`"></v-list-item>
                <v-list-item v-else :title="auth.fullname" :subtitle="auth.email"  prepend-icon="mdi-account"></v-list-item>
            </nuxt-link>
        </v-list>
        
        <v-divider></v-divider>

        <v-list>
            <v-list-subheader>Navegación</v-list-subheader>
            <nuxt-link to="/videos" class="text-decoration-none" ><v-list-item prepend-icon="mdi-video" title="Registros de video"></v-list-item></nuxt-link>
            <nuxt-link to="/conjuntos" class="text-decoration-none" ><v-list-item prepend-icon="mdi-folder-multiple" title="Grupos documentales"></v-list-item></nuxt-link>
        </v-list>
        
        <v-divider v-if="auth.isLoggedIn && (auth.canCreate || auth.isAdmin )"></v-divider>

        <v-list v-if="auth.isLoggedIn && (auth.canCreate || auth.isAdmin )">
            <v-list-subheader>Administración</v-list-subheader>
            <nuxt-link v-if="auth.canCreate" to="/videos/nuevo" class="text-decoration-none"><v-list-item prepend-icon="mdi-file-video" title="Crear registro"></v-list-item></nuxt-link>
            <nuxt-link v-if="auth.canCreate" to="/conjuntos/nuevo" class="text-decoration-none"><v-list-item prepend-icon="mdi-folder-play" title="Crear grupo documental"></v-list-item></nuxt-link>
            <nuxt-link v-if="auth.isAdmin" to="/usuarios" class="text-decoration-none"><v-list-item prepend-icon="mdi-account-multiple" title="Lista de usuarios"></v-list-item></nuxt-link>
        </v-list>
        
        <v-btn @click="website.toggleTheme" prepend-icon="mdi-theme-light-dark">Tema de color</v-btn>
    </v-navigation-drawer>
    
</template>

<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
const website = useWebsiteStore()
const auth = useAuthStore()
</script>