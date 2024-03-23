<template>
    <v-app-bar elevation="4" rounded>
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        

        <v-app-bar-title>Registros en video</v-app-bar-title>
        
        <template v-slot:append>        
            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>
</template>

<script setup>
const  items = [
    { title: 'Iniciar sesión' },
    { title: 'Crear usuario' },
]
</script>