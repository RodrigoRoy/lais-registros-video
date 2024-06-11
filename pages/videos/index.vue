<template>
    <v-container>
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="(video, i) in videos" :key="video._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <v-hover>
                    <!-- Interacción de fondo de color cuando el mouse hace acción :hover -->
                    <template v-slot:default="{ isHovering, props }">
                        <!-- Cada elemento es un v-card, al dar clic se navega a su página -->
                        <v-card :title="video.identificacion.codigoReferencia" v-bind="props" :color="isHovering ? 'teal-darken-4' : undefined" class="mx-auto" :class="{ 'opacity-30': video.adicional.isDraft }" max-width="400" link @click="navigateTo(`/videos/${video._id}`)" v-if="!video.adicional.isDraft || (video.adicional.isDraft && auth.id === video.controlDescripcion.documentalista)">
                            
                            <!-- Menu para edición y borrado (requiere permisos) -->
                            <template v-slot:append v-if="auth.isLoggedIn && (auth.canUpdate || auth.canDelete)">
                                <v-menu transition="slide-y-transition">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" icon="mdi-dots-horizontal" variant="plain"></v-btn>
                                    </template>
                                    <!-- Lista de acciones para administración -->
                                    <v-list>
                                        <!-- EDITAR -->
                                        <v-list-item>
                                            <nuxt-link v-if="auth.canUpdate" :to="`/videos/${video._id}/edit`" class="text-decoration-none"><v-btn>Editar</v-btn></nuxt-link>
                                        </v-list-item>
                                        
                                        <!-- BORRAR -->
                                        <v-list-item>
                                            <!-- Opción para borrar con ventana emergente de confirmación -->
                                            <v-dialog :max-width="500">
                                                <template v-slot:activator="{ props: activatorProps }">
                                                    <v-btn v-bind="activatorProps">Borrar</v-btn>
                                                </template>
                                                <template v-slot:default="{ isActive }">
                                                    <v-card max-width="400" prepend-icon="mdi-alert" color="error" variant="elevated" title="Borrar registro" :text="`Por favor confirme la eliminación del registro ${video.identificacion.codigoReferencia}. Esta operación no se puede revertir y la información almacenada se perderá.`" >
                                                        <v-card-actions>
                                                            <v-btn @click="isActive.value = false" variant="elevated" color="error">Cancel</v-btn>
                                                            <v-btn @click="deleteVideo(video._id)" variant="plain">Borrar</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </template>
                                            </v-dialog>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </template>
                            
                            <!-- Incluir una imagen hace que aparezca como encabezado -->
                            <!-- Note: En Linux, NuxtImage no sirve debido a error con el paquete 'sharp' -->
                            <!-- <nuxt-picture height="250" :src="`/data/image/${video.adicional.imagen}`" fit="outside" quality="70" /> -->
                            <!-- <nuxt-img height="250" :src="`/data/image/${video.adicional.imagen}`" fit="outside" quality="70" /> -->
                            <v-img height="250" width="auto" :src="`/data/image/${video.adicional.imagen}`" cover ></v-img>

                            <!-- Resto del texto (descripción a una línea) -->
                            <v-card-text>
                                <p class="text-truncate">{{ video.contenidoEstructura?.descripcionGeneral || '(Sin descripcion)'}}</p>
                            </v-card-text>

                            <!-- Acciones / botón para mostrar más información -->
                            <v-card-actions>
                                <v-btn size="small" :prepend-icon="video.adicional.bookmarkedBy.includes(auth.id) ? 'mdi-bookmark' : 'mdi-bookmark-outline'" @click.prevent.stop="toggleBookmark(video)">{{ video.adicional.bookmarkedBy.length }}</v-btn>
                                <v-btn size="small" prepend-icon="mdi-chart-bar">{{ video.adicional.fetchCount }}</v-btn>
                                <v-btn size="small" prepend-icon="mdi-play">{{ video.adicional.playCount }}</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="secondary" icon="mdi-chevron-up" @click.prevent.stop="revealId = i"></v-btn>
                            </v-card-actions>

                            <!-- "Cortina" para mostrar información adicional -->
                            <v-expand-transition @click.prevent.stop>
                                <v-card v-if="revealId === i" class="position-absolute w-100" height="100%" style="bottom: 0;">
                                    <v-card-text class="pb-0">
                                        <p class="text-caption text--primary">
                                            {{ video.identificacion.codigoReferencia }}
                                        </p>
                                        <p>
                                            <v-icon icon="mdi-calendar-blank" size="x-small"></v-icon>
                                            {{ $dayjs(video.identificacion.fecha).format('DD/MM/YYYY') }}
                                        </p>
                                        <p v-if="video.identificacion?.pais || video.identificacion?.lugar" class="text-body-2">
                                            <v-icon icon="mdi-map-marker" size="x-small"></v-icon>
                                            <span v-if="video.identificacion.pais">{{ video.identificacion.pais }}</span>
                                            <span v-if="video.identificacion.pais && video.identificacion.lugar">, </span>
                                            <span v-if="video.identificacion.lugar">{{ video.identificacion.lugar }}</span>
                                        </p>
                                        <p v-if="video.identificacion?.personasEntrevistadas" class="text-body-2">
                                            <v-icon icon="mdi-account" size="x-small"></v-icon>
                                            {{ video.identificacion.personasEntrevistadas }}
                                        </p>
                                        <p class="text-body-2">
                                            <p>{{ video.contenidoEstructura?.descripcionGeneral || '(Sin descripción)' }}</p>
                                        </p>
                                    </v-card-text>
                                    <v-card-actions class="pt-0">
                                        <v-spacer></v-spacer>
                                        <v-btn color="teal-accent-4" icon="mdi-chevron-down" @click.prevent.stop="revealId = null"></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-expand-transition>
                        </v-card>
                    </template>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Lista de registros en video
const { data: videos } = await useFetch('/api/videos') // reasignación de variable 'data' a 'videos'

// Auxiliar para determinar el v-card del cual se desea ver más información
const revealId = ref(null)

/**
 * Agrega o quita un video de la lista de marcadores.
 * Nota: Para evitar recargar la información de la lista de videos,
 * además de realizar la petición a la BD para actualizar, 
 * se modifica directamente la propiedad "adicional.bookmarkedBy"
 * @param {object} video Representa un registro de video
 */
async function toggleBookmark(video){
    // Sin sesión iniciada, no realizar cambios
    if(!auth.id) return
    
    // Si hay sesión iniciada y está incluida en lista de marcadores
    if(video.adicional.bookmarkedBy.includes(auth.id)){
        // Quitar de la lista de marcadores
        video.adicional.bookmarkedBy.splice(video.adicional.bookmarkedBy.indexOf(auth.id), 1)
        await $fetch(`/api/bookmarks/user/${auth.id}`, {
            method: 'DELETE',
            body: video,
        })
    }
    else {
        // Agregar a la lista de marcadores
        video.adicional.bookmarkedBy.push(auth.id)
        // Actualizar en la base de datos
        await $fetch(`/api/bookmarks/user/${auth.id}`, {
            method: 'PUT',
            body: video,
        })
    }
    // Actualizar token (en particular, la lista de marcadores)
    await auth.updateToken()
}

/**
 * Función para borrar un registro de video de la base de datos
 * @param {string} id Id (de la base de datos) del video que se desea borrar
 */
async function deleteVideo(id){
    await $fetch(`/api/videos/${id}`, {
        method: 'DELETE',
    })

    // Reload data using native Nuxt util function
    try{
        await refreshNuxtData()
    }
    catch(error){
        createError({statusCode:400, statusMessage: error})
    }
}
</script>