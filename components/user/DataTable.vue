<template>
    <v-data-table :headers="dataTableHeaders" :items="videos" density="compact" hide-no-data :hide-default-footer="videos?.length <= videosPerPage" hover :items-per-page="videosPerPage" :no-filter="true">
        <!-- Portada -->
        <template v-slot:item.portada="{ value }">
            <v-img :src="`/data/image/${value}`" cover></v-img>
        </template>
        <!-- Botones de acción (ver, editar) -->
        <template v-slot:item._id="{ value }">
            <nuxt-link :to="`/videos/${value}`" class="text-decoration-none">
                <v-btn icon="mdi-video" density="compact"></v-btn>
            </nuxt-link>
            <nuxt-link :to="`/videos/${value}/edit`" class="text-decoration-none">
                <v-btn icon="mdi-pencil" density="compact"></v-btn>
            </nuxt-link>
        </template>
    </v-data-table>
</template>


<script setup>
defineProps(['videos'])

// Biblioteca para mostrar fechas
const dayjs = useDayjs()

const videosPerPage = ref(5)

// Encabezados con los datos relevantes a mostrar para la lista de videos
const dataTableHeaders = [
    {title: 'Portada', key: 'portada', value: 'adicional.imagen', sortable: false},
    {title: 'Código de referencia', key: 'codigoReferencia', value: 'identificacion.codigoReferencia', sortable: true},
    {title: 'Fecha del registro', key: 'fechaString', value: item => dayjs(item.identificacion.fecha).format('DD/MM/YYYY'), sortable: true},
    {title: 'Duración', key: 'duracionString', value: 'identificacion.duracion', sortable: true},
    {title: 'Fecha de creación', key: 'creacionString', value: item => dayjs(item.createdAt).format('DD/MM/YYYY HH:mm'), sortable: false},
    {title: 'Acciones', key: '_id', value: '_id', sortable: false},
]
</script>