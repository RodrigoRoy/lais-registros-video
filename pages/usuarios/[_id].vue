<template>
    <v-card color="transparent">
        <v-sheet class="d-flex align-center justify-center flex-wrap text-center my-4 mx-auto px-4 bg-accent" elevation="4"  max-width="400" width="100%" rounded >
            <div>
                <div class="my-2">
                    <v-avatar v-if="user.profileImage" icon="mdi-account" :image="`/data/profile/${user.profileImage}`" style="height: 150px; width: 150px;" variant="elevated" ></v-avatar>
                    <v-avatar v-else icon="mdi-account" image="~/assets/personalPage.gif" style="height: 150px; width: 150px;" variant="elevated" ></v-avatar>
                    <p v-if="user.admin" class="mb-2 font-italic text-overline text-center">Administrador/a</p>
                    
                </div>

                <div class="my-3">
                    <p class="text-h6 text-md-h5 text-lg-h4"> {{ user.fullname }} </p>
                    <p > @{{ user.name }} </p>
                </div>

                <div class="text-subtitle-1">
                    <v-icon icon="mdi-email"></v-icon>
                    {{ user.email }}
                    <p :class="user.active? 'text-green-darken-4' : 'text-red-darken-4'">
                        Usuario <span v-if="!user.active">in</span>activo
                    </p>
                </div>
                
                <!-- Boton para editar datos del usuario -->
                <div class="pa-4 text-center mt-3" >
                    <nuxt-link :to="`/usuarios/${route.params._id}/edit`" >
                        <v-btn variant="elevated" prepend-icon="mdi-account-edit">
                            Editar
                        </v-btn>
                    </nuxt-link>
                </div>
            </div>
        </v-sheet>
    </v-card>

    <!-- Lista de marcadores del usuario -->
    <v-container v-if="user.bookmarks?.length > 0">
        <v-row>
            <v-col>
                <p>Videos guardados</p>
                <v-data-table :headers="dataTableHeaders" :items="user.bookmarks" density="compact" hide-no-data :hide-default-footer="user.bookmarks?.length <= 10" hover items-per-page="5" :no-filter="true">
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
            </v-col>
        </v-row>
    </v-container>

    <!-- Lista de videos que ha creado el usuario -->
    <v-container v-if="user.videos?.length > 0">
        <v-row>
            <v-col>
                <p>Registros creados</p>
                <v-data-table :headers="dataTableHeaders" :items="user.videos" density="compact" hide-no-data :hide-default-footer="user.videos?.length <= 5" hover items-per-page="5" :no-filter="true">
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
            </v-col>
        </v-row>
    </v-container>

    <!-- Lista de videos que son borradores hechos por el usuario -->
    <!-- v-for="(borrador, i) in userDraftList" :key="userDraftList._id" -->
    <v-container v-if="user.drafts?.length > 0">
        <v-row>
            <v-col>
                <p>Borradores</p>
                <v-data-table :headers="dataTableHeaders" :items="user.drafts" density="compact" hide-no-data :hide-default-footer="user.drafts?.length <= 10" hover items-per-page="5" :no-filter="true">
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
const { data: user } = await useFetch(`/api/usuarios/${route.params._id}`, {query: {drafts: true, bookmarks: true, videos: true}})

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