<template>
    <v-hover>
        <!-- Interacción de fondo de color cuando el mouse hace acción :hover -->
        <template v-slot:default="{ isHovering, props }">
            <!-- Cada elemento es un v-card, al dar clic se navega a su página -->
            <v-card :title="type === 'video' ? data.identificacion.codigoReferencia : (type === 'conjunto' ? data.identificacion.titulo : '')" v-bind="props" :color="isHovering ? undefined : color" class="mx-auto" :class="{ 'opacity-30': data.adicional.isDraft }" max-width="400" link @click="navigate(type, data._id, nav)" v-if="!data.adicional.isDraft || (data.adicional.isDraft && (auth.id === data.controlDescripcion.documentalista))">
                
                <!-- Menu para edición y borrado (requiere permisos) -->
                <template v-slot:append v-if="auth.isLoggedIn && (auth.canUpdate || auth.canDelete)">
                    <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-dots-vertical" variant="plain"></v-btn>
                        </template>
                        <!-- Lista de acciones para administración -->
                        <v-list>
                            <!-- EDITAR -->
                            <v-list-item>
                                <nuxt-link v-if="auth.canUpdate" :to="`/${type === 'video' ? 'videos' : 'conjuntos'}/${data._id}/edit`" class="text-decoration-none"><v-btn>Editar</v-btn></nuxt-link>
                            </v-list-item>
                            
                            <!-- BORRAR -->
                            <v-list-item v-if="auth.canDelete">
                                <!-- Opción para borrar con ventana emergente de confirmación -->
                                <v-dialog :max-width="500">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn v-bind="activatorProps">Borrar</v-btn>
                                    </template>
                                    <template v-slot:default="{ isActive }">
                                        <v-card max-width="400" prepend-icon="mdi-alert" color="error" variant="elevated" title="Borrado de información" :text="`Esta operación no se puede revertir y la información almacenada se eliminará permanentemente.`" >
                                            <v-card-actions>
                                                <v-btn @click="isActive.value = false" variant="elevated" color="error">Cancel</v-btn>
                                                <v-btn @click="deleteData(data, type)" variant="plain">Borrar</v-btn>
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
                <!-- <nuxt-picture height="250" :src="`/data/image/${data.adicional.imagen}`" fit="outside" quality="70" /> -->
                <!-- <nuxt-img height="250" :src="`/data/image/${data.adicional.imagen}`" fit="outside" quality="70" /> -->
                <v-img v-if="data.adicional?.imagen" height="250" width="auto" :src="`/data/image/${data.adicional.imagen}`" cover ></v-img>
                <v-img v-else height="250" width="auto" src="~/assets/Logo LAIS.png" cover :class="defaultBgColor"></v-img>
                
                <!-- Resto del texto (descripción a una línea) -->
                <v-card-text>
                    <p class="text-truncate">{{ type === 'video' ? (data.contenidoEstructura?.descripcionGeneral || '(Sin descripción)') : (data.adicional?.presentacion || '(Sin descripcion)')}}</p>
                </v-card-text>
                
                <!-- Acciones / botón para mostrar más información -->
                <v-card-actions>
                    <!-- Marcador / favorito -->
                    <v-btn v-if="type === 'video'" size="small" :prepend-icon="data.adicional.bookmarkedBy.includes(auth.id) ? 'mdi-bookmark' : 'mdi-bookmark-outline'" @click.prevent.stop="toggleBookmark(data)">{{ data.adicional.bookmarkedBy.length }}</v-btn>

                    <!-- Número de vistas -->
                    <v-btn size="small" prepend-icon="mdi-chart-bar">{{ data.adicional.fetchCount }}</v-btn>

                    <!-- Número de reproducciones -->
                    <v-btn v-if="type === 'video'" size="small" prepend-icon="mdi-play">{{ data.adicional.playCount }}</v-btn>

                    <v-spacer></v-spacer>
                    
                    <!-- Más información -->
                    <v-btn :color="subcolor" icon="mdi-chevron-up" @click.prevent.stop="revealId = i"></v-btn>
                </v-card-actions>
                
                <!-- "Cortina" para mostrar información adicional -->
                <v-expand-transition @click.prevent.stop>
                    <v-card v-if="revealId === i" @click.prevent.stop="revealId = null" class="position-absolute w-100" height="100%" style="bottom: 0;" :color="undefined">
                        <v-card-text class="pb-0">
                            <!-- Título / Código de referencia -->
                            <p class="text-caption text--primary">
                                {{ type === 'video' ? data.identificacion.codigoReferencia : data.identificacion.titulo }}
                            </p>

                            <!-- Fecha y lugar -->
                            <p>
                                <!-- Fecha -->
                                <span v-if="data.identificacion.fecha">
                                    <v-icon icon="mdi-calendar-blank" size="x-small"></v-icon>
                                    {{ type === 'video' ? $dayjs(data.identificacion.fecha).format('DD/MM/YYYY') : data.identificacion.fecha }}
                                </span>
                                
                                <!-- Lugar -->
                                <span v-if="data.identificacion?.pais || data.identificacion?.lugar" class="text-body-2 ml-2">
                                    <v-icon icon="mdi-map-marker" size="x-small"></v-icon>
                                    <span v-if="data.identificacion.pais">{{ data.identificacion.pais }}</span>
                                    <span v-if="data.identificacion.pais && data.identificacion.lugar">, </span>
                                    <span v-if="data.identificacion.lugar">{{ data.identificacion.lugar }}</span>
                                </span>
                            </p>

                            <!-- Personas entrevistadas -->
                            <p v-if="type === 'video' && data.identificacion?.personasEntrevistadas" class="text-body-2">
                                <v-icon icon="mdi-account" size="x-small"></v-icon>
                                {{ data.identificacion.personasEntrevistadas }}
                            </p>

                            <!-- Descripción o presentación -->
                            <p class="text-body-2 mt-2">
                                {{ type === 'video' ? (data.contenidoEstructura?.descripcionGeneral || '(Sin descripción)') : ( data.adicional?.presentacion || '(Sin descripción)') }}
                            </p>
                        </v-card-text>

                        <!-- Botón para cerrar "cortina" -->
                        <v-card-actions class="pt-0">
                            <v-spacer></v-spacer>
                            <v-btn :color="subcolor" icon="mdi-chevron-down" @click.prevent.stop="revealId = null"></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-expand-transition>
            </v-card>
        </template>
    </v-hover>

</template>

<script setup>
defineProps({
    data: {type: Object, required: true},
    type: {type: String, required: true, validator(value, props){ return ['conjunto', 'video'].includes(value) }}, // only valid options
    revealId: {type: [Number, null], default: null}, // required but nullable
    color: {type: String, default: 'primary'},
    subcolor: {type: String, default: 'accent'},
    nav: {type: Boolean}, // true for use in '/nav' page, false otherwise
})
const emit = defineEmits(['delete'])

// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Color de fondo por defecto cuando no hay imagen
const defaultBgColor = 'bg-blue-grey-darken-4'

/**
 * Reenvia a la página a la que se desea navegar, tomando en consideración el tipo y 
 * el modo de navegación (nav prop).
 * @param {string} type Video o colección
 * @param {string} id Id en base de datos
 * @param {boolean} nav Modo de navegación o acceso directo
 */
function navigate(type, id, nav){
    if(!id || typeof nav != undefined || !type || type !== 'video' || type !== 'conjunto')
        navigateTo()

    if(type === 'video')
        return navigateTo(`/videos/${id}`)
    else
        if(nav)
            return navigateTo({ path: '/nav', query: {id: id} })
        return navigateTo(`/conjuntos/${id}`)
}

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
 * Borrar conjunto de la base de datos
 * @param {Object} data Conjunto que se desea borrar
 * @param {string} type Video o colección
 */
 async function deleteData(data, type){
    if(!data?._id || !data?.adicional?.parent || !type )
        return

    if(type === 'video'){
        // Borrar referencia del conjunto padre
        if(data.adicional?.parent)
            await $fetch(`/api/conjuntos/hierarchy/${data.adicional.parent}`, {
                method: 'DELETE',
                query: {id: data._id, type: "video"}
            })
        // Borrar video
        await $fetch(`/api/videos/${data._id}`, {
            method: 'DELETE',
            query: { id: auth?.id }
        })
        emit('delete')
    }
    else{
        // Borrar referencia del conjunto padre
        if(data.adicional?.parent)
            await $fetch(`/api/conjuntos/hierarchy/${data.adicional.parent}`, {
                method: 'DELETE',
                query: {id: data._id, type: "conjunto"}
            })
        // Borrar conjunto
        await $fetch(`/api/conjuntos/${data._id}`, {
            method: 'DELETE',
            query: { id: auth?.id }
        })
        emit('delete')
    }
}
</script>