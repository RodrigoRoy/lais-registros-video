<template>
    <v-card color="transparent">
        <v-container>
            <v-col cols="4">
                <div class="text-h4 text-start">
                    Perfil
                </div>
            </v-col>
        </v-container>
        <v-sheet class="d-flex align-center justify-center flex-wrap text-center mb-2 mx-auto px-4 bg-deep-orange-lighten-5" elevation="4"  max-width="400" width="100%" rounded >
            <div>
                <div class="my-2">
                    <v-avatar icon="mdi-account" :image="user.profileImage ? `/data/profile/${user.profileImage}` : '`~/assets/personalPage.gif`' " style="height: 150px; width: 150px;" variant="elevated" ></v-avatar>
                    <p v-if="user.admin" class="mb-2 font-italic text-overline text-end">Administrador</p>
                    
                </div>
                <div class="my-3">
                    <p class="text-h6 text-md-h5 text-lg-h4"> {{ user.fullname }} </p>
                    <p > @{{ user.name }} </p>
                </div>
                <!-- <v-list-item title="`${user.fullname}`" subtitle="@{{ user.name }}">

                </v-list-item> -->
                <div class="text-subtitle-1">
                    <v-icon icon="mdi-email"></v-icon>
                    {{ user.email }}
                </div>
                
                <p :class="user.active? 'text-green-darken-4' : 'text-red-darken-4'">
                    Usuario <span v-if="!user.active">in</span>activo
                </p>
                
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
    <v-container v-if="userBookmarks?.length > 0">
        <v-row>
            <v-col>
                <p>Videos guardados</p>
                <v-data-table :headers="dataTableHeaders" :items="userBookmarks" density="compact" hide-no-data :hide-default-footer="userBookmarks?.length <= 10" hover items-per-page="5" :no-filter="true">
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
    <v-container v-if="userVideosList?.length > 0">
        <v-row>
            <v-col>
                <p>Registros creados</p>
                <v-data-table :headers="dataTableHeaders" :items="userVideosList" density="compact" hide-no-data :hide-default-footer="userVideosList?.length <= 10" hover items-per-page="5" :no-filter="true">
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
    <v-container v-if="userDraftList?.length > 0">
        <v-row>
            <v-col>
                <p>Borradores *PENDIENTE - items-per-page*</p>
                <v-data-table :headers="dataTableHeaders" :items="userDraftList" item-selectable="userDraftList.adicional.isDraft" density="compact" hide-no-data :hide-default-footer="userDraftList?.length <= 10" hover items-per-page="5" :no-filter="true">
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

    {{ userDraftList[7].adicional.isDraft }}
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
const { data: user } = await useFetch(`/api/usuarios/${route.params._id}`)

// Lista de marcadores del usuario
const { data: userBookmarks } = await useFetch(`/api/bookmarks/user/${route.params._id}`)

// Lista de videos creados por el usuario
const { data: userVideosList } = await useFetch(`/api/videos/user/${route.params._id}`)

// Lista de borradores creados por el usuario
const { data: userDraftList } = await useFetch(`/api/videos/user/${route.params._id}`)

// Encabezados con los datos relevantes a mostrar para la lista de videos
const dataTableHeaders = [
    {title: 'Portada', key: 'portada', value: 'adicional.imagen', sortable: false},
    {title: 'Código de referencia', key: 'codigoReferencia', value: 'identificacion.codigoReferencia', sortable: false},
    {title: 'Fecha del registro', key: 'fechaString', value: item => dayjs(item.identificacion.fecha).format('DD/MM/YYYY'), sortable: false},
    {title: 'Duración', key: 'duracionString', value: item => minutesToHour(item.identificacion.duracion), sortable: false},
    {title: 'Fecha de creación', key: 'creacionString', value: item => dayjs(item.createdAt).format('DD/MM/YYYY HH:mm'), sortable: false},
    {title: 'Acciones', key: '_id', value: '_id', sortable: false},
]
</script>