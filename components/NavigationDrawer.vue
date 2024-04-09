<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
const website = useWebsiteStore()
const auth = useAuthStore()
</script>

<template>
    
    <v-navigation-drawer v-model="website.isDrawerVisible" temporary>
        <v-list v-show="auth.isLoggedIn">
            <v-list-item :title="auth.fullname" :subtitle="auth.email"></v-list-item>
        </v-list>
        
        <v-divider></v-divider>

        <v-list>
            <v-list-item title="Navigation drawer"></v-list-item>
            <nuxt-link to="/videos" class="text-decoration-none" ><v-list-item title="Registros de video"></v-list-item></nuxt-link>
        </v-list>
    </v-navigation-drawer>
    
</template>
