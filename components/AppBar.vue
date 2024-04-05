<template>
    <v-app-bar elevation="4" rounded>
        
        
        <v-app-bar-title>Registros en video</v-app-bar-title>
        

        
        
        
        
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>
            
            <v-list>
                <v-list-item v-for="(item, i) in sinLoggear" :key="i">
                    <v-list-item-title>
                        <v-btn class="" variant="text">
                            {{ item.title }}
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script setup>
const  sinLoggear = [
    { title: 'Iniciar sesión' },
    { title: 'Crear usuario' },
]
const userLoggeado = [
    { title: 'Página personal' },
    { title: 'Administración' },
    { title: 'Cerrar sesión' },

]
const registrado = ref(true)

const proyectos = [
    { title: 'Proyecto 1', grupo: '5', subgrupo: '7' },
    { title: 'Proyecto 2', grupo: '4', subgrupo: '7' },
    { title: 'Proyecto 3', grupo: '3', subgrupo: '7' },
    { title: 'Proyecto 4', grupo: '2', subgrupo: '7' },
    { title: 'Proyecto 5', grupo: '1', subgrupo: '7' },
]

const drawer = ref(null)
</script>