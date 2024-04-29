<template>
    <h4 class="text-h4 pa-6 ma-2">
        Página personal
    </h4>
    <v-card>
        <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250" max-width="800" width="100%" rounded >
            <div>
                <h2 class="font-weight-black">
                    <h4>Nombre: {{ user.name }} </h4>
                    <h4>Usuario: {{ user.fullname }}</h4>
                    <h4>Correo: {{ user.email }}</h4>
                    <span v-if="user.admin">Eres admin</span>
                </h2>
            </div>
        </v-sheet>
    </v-card>

    <!-- Lista de videos que ha creado el usuario -->
    <v-container v-if="userVideosList?.length > 0">
        <v-row>
            <v-col>
                <p>Registros creados</p>
                <v-data-table :headers="dataTableHeaders" :items="userVideosList"></v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
// Nota: descomentar middleware para incluir restricciones de acceso, comentar para pruebas rápidas
// definePageMeta({
//     middleware: [
//         'auth',
//     ]
// })

// Composable para obtener parametros desde URL
const route = useRoute()

// Biblioteca para mostrar fechas
const dayjs = useDayjs()

// Información del usuario
const user = await $fetch(`/api/usuarios/${route.params._id}`)

// Lista de videos creados por el usuario
const userVideosList = await $fetch(`/api/videos/user/${route.params._id}`)

// Encabezados con los datos relevantes a mostrar para la lista de videos
const dataTableHeaders = [
    {title: 'Código de referencia', value: 'identificacion.codigoReferencia'},
    {title: 'Fecha del registro', key: 'fechaString', value: item => dayjs(item.identificacion.fecha).format('DD/MM/YYYY')},
    {title: 'Duración', key: 'duracionString', value: item => `${item.identificacion.duracion} s`},
    {title: 'Fecha de creación', key: 'creacionString', value: item => dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')},
]
</script>