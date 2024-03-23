<template>
    <v-app-bar elevation="4" rounded>
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        
        <v-app-bar-title>Registros en video</v-app-bar-title>
        
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>
            
            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-title>
                        <v-btn class="" >
                            {{ item.title }}
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script setup>
const  items = [
    { title: 'Iniciar sesión' },
    { title: 'Crear usuario' },
]
</script>