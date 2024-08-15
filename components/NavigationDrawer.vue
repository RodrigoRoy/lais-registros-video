<template>
    <v-navigation-drawer v-model="website.isDrawerVisible" temporary color="primary"> <!-- scrim="secondary" -->
        <v-list v-if="auth.isLoggedIn">
            <nuxt-link v-if="auth.profileImage" :to="`/usuarios/${auth.id}`" style="text-decoration: none; color: inherit">
                <v-list-item :title="auth.fullname" :subtitle="auth.email" :prepend-avatar="`/data/profile/${auth.profileImage}`"></v-list-item>
            </nuxt-link>
            <nuxt-link v-else :to="`/usuarios/${auth.id}`" style="text-decoration: none; color: inherit">
                <v-list-item :title="auth.fullname" :subtitle="auth.email" prepend-icon="mdi-account"></v-list-item>
            </nuxt-link>
        </v-list>
        
        <v-divider v-if="auth.isLoggedIn"></v-divider>

        <v-list>
            <v-list-subheader>Navegación</v-list-subheader>
            <nuxt-link to="/videos" style="text-decoration: none; color: inherit">
                <v-list-item link title="Registros de video" prepend-icon="mdi-video"></v-list-item>
            </nuxt-link>
            <nuxt-link to="/conjuntos" style="text-decoration: none; color: inherit">
                <v-list-item link prepend-icon="mdi-folder-multiple" title="Grupos documentales"></v-list-item>
            </nuxt-link>
        </v-list>
        
        <v-divider v-if="auth.isLoggedIn && (auth.canCreate || auth.isAdmin )"></v-divider>

        <v-list v-if="auth.isLoggedIn && (auth.canCreate || auth.isAdmin )">
            <v-list-subheader>Administración</v-list-subheader>
            <nuxt-link v-if="auth.canCreate" to="/videos/nuevo" style="text-decoration: none; color: inherit">
                <v-list-item link prepend-icon="mdi-file-video" title="Crear registro"></v-list-item>
            </nuxt-link>
            <nuxt-link v-if="auth.canCreate" to="/conjuntos/nuevo" style="text-decoration: none; color: inherit">
                <v-list-item link prepend-icon="mdi-folder-play" title="Crear grupo documental"></v-list-item>
            </nuxt-link>
            <nuxt-link v-if="auth.isAdmin" to="/usuarios" style="text-decoration: none; color: inherit">
                <v-list-item link prepend-icon="mdi-account-multiple" title="Lista de usuarios"></v-list-item>
            </nuxt-link>
        </v-list>
        
        <v-btn @click="website.toggleTheme" prepend-icon="mdi-theme-light-dark" class="ml-2 mt-4" variant="tonal">Tema de color</v-btn>
    </v-navigation-drawer>
</template>

<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
const website = useWebsiteStore()
const auth = useAuthStore()
</script>