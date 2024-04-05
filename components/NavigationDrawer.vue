<script setup>
// State manager
import { useWebsiteStore } from '@/stores/website'
const website = useWebsiteStore()
</script>

<template>
    
    <v-navigation-drawer v-model="website.isDrawerVisible" temporary>
        <v-list>
            <v-list-item title="Navigation drawer"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    
</template>
