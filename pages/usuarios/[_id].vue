<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center my-4 mx-auto px-4" elevation="4"  max-width="400" width="100%" rounded color="primary">
        <div>
            <div class="my-2">
                <v-avatar v-if="user.profileImage" icon="mdi-account" :image="`/data/profile/${user.profileImage}`" style="height: 150px; width: 150px;" variant="elevated" ></v-avatar>
                <v-avatar v-else icon="mdi-account" image="~/assets/personalPage.gif" style="height: 150px; width: 150px;" variant="elevated" ></v-avatar>
            </div>

            <div class="my-3">
                <p class="text-h6 text-md-h5 text-lg-h4"> {{ user.fullname }} </p>
                <p > @{{ user.name }} </p>
            </div>

            <div class="text-subtitle-1">
                <v-icon icon="mdi-email"></v-icon>
                {{ user.email }}
                <p>
                    <v-chip v-if="!user.active" color="error" variant="flat" size="small" density="compact" class="mr-2">
                        Cuenta bloqueada
                    </v-chip>
                    <v-chip v-if="user.admin" color="amber-darken-1" variant="flat" size="small" density="compact">
                        <v-icon icon="mdi-key" class="mr-1"></v-icon>
                        Administrador/a
                    </v-chip>
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

    <!-- Lista de marcadores del usuario -->
    <v-container v-if="user.bookmarks?.length > 0">
        <v-row>
            <v-col>
                <p>Videos guardados</p>
                <user-data-table :videos="user.bookmarks" />
            </v-col>
        </v-row>
    </v-container>
    <p v-else class="text-center font-italic font-weight-thin">
        {{user.fullname}} no tiene marcadores
    </p>

    <!-- Lista de videos que ha creado el usuario -->
    <v-container v-if="user.videos?.length > 0">
        <v-row>
            <v-col>
                <p>Registros creados</p>
                <user-data-table :videos="user.videos" />
            </v-col>
        </v-row>
    </v-container>

    <!-- Lista de videos que son borradores hechos por el usuario -->
    <!-- v-for="(borrador, i) in userDraftList" :key="userDraftList._id" -->
    <v-container v-if="user.drafts?.length > 0">
        <v-row>
            <v-col>
                <p>Borradores</p>
                <user-data-table :videos="user.drafts" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
// Composable para obtener parametros desde URL
const route = useRoute()

// Información del usuario
const { data: user } = await useFetch(`/api/usuarios/${route.params._id}`, {method: 'GET', query: {drafts: true, bookmarks: true, videos: true}})


</script>