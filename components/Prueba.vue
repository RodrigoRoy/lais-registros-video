<template>
        <v-navigation-drawer v-model="drawer" permanent="false">
            
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  </template>

<script setup>
const drawer = ref(null)
</script>