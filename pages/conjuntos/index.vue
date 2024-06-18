<template>
    <v-container>
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="(conjunto, i) in conjuntos" :key="conjunto._id" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3" xl="3">
                <v-hover>
                    <!-- Interacción de fondo de color cuando el mouse hace acción :hover -->
                    <template v-slot:default="{ isHovering, props }">
                        <!-- Cada elemento es un v-card, al dar clic se navega a su página -->
                        <v-card :title="conjunto.identificacion.titulo" v-bind="props" :color="isHovering ? 'lime-darken-4' : undefined" class="mx-auto" max-width="400" link @click="navigateTo(`/conjuntos/${conjunto._id}`)">
                            
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
                                            <nuxt-link v-if="auth.canUpdate" :to="`/conjuntos/${conjunto._id}/edit`" class="text-decoration-none"><v-btn>Editar</v-btn></nuxt-link>
                                        </v-list-item>
                                        
                                        <!-- BORRAR -->
                                        <v-list-item v-if="auth.canDelete">
                                            <!-- Opción para borrar con ventana emergente de confirmación -->
                                            <v-dialog :max-width="500">
                                                <template v-slot:activator="{ props: activatorProps }">
                                                    <v-btn v-bind="activatorProps">Borrar</v-btn>
                                                </template>
                                                <template v-slot:default="{ isActive }">
                                                    <v-card max-width="400" prepend-icon="mdi-alert" color="error" variant="elevated" title="Borrar grupo documental" :text="`Por favor confirme la eliminación del grupo documental ${conjunto.identificacion.codigoReferencia}. Esta operación no se puede revertir y la información almacenada se perderá.`" >
                                                        <v-card-actions>
                                                            <v-btn @click="isActive.value = false" variant="elevated" color="error">Cancel</v-btn>
                                                            <v-btn @click="deleteConjunto(conjunto._id)" variant="plain">Borrar</v-btn>
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
                            <!-- <nuxt-picture height="250" :src="`/data/image/${conjunto.adicional.imagen}`" fit="outside" quality="70" /> -->
                            <!-- <nuxt-img height="250" :src="`/data/image/${conjunto.adicional.imagen}`" fit="outside" quality="70" /> -->
                            <v-img v-if="conjunto.adicional?.imagen" height="250" width="auto" :src="`/data/image/${conjunto.adicional.imagen}`" cover ></v-img>
                            <v-img v-else height="250" width="auto" src="~/assets/Logo LAIS.png" cover ></v-img>

                            <!-- Resto del texto (descripción a una línea) -->
                            <v-card-text>
                                <p class="text-truncate">{{ conjunto.adicional?.presentacion || '(Sin descripcion)'}}</p>
                            </v-card-text>

                            <!-- Acciones / botón para mostrar más información -->
                            <v-card-actions>
                                <v-btn size="small" prepend-icon="mdi-chart-bar">{{ conjunto.adicional.fetchCount }}</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="secondary" icon="mdi-chevron-up" @click.prevent.stop="revealId = i"></v-btn>
                            </v-card-actions>

                            <!-- "Cortina" para mostrar información adicional -->
                            <v-expand-transition @click.prevent.stop>
                                <v-card v-if="revealId === i" class="position-absolute w-100" height="100%" style="bottom: 0;">
                                    <v-card-text class="pb-0">
                                        <p class="text-caption text--primary">
                                            {{ conjunto.identificacion.codigoReferencia }}
                                        </p>
                                        <p class="text-caption text--primary">
                                            <v-icon icon="mdi-calendar-blank" size="x-small"></v-icon>
                                            {{ conjunto.identificacion.fecha }}
                                        </p>
                                        <p v-if="conjunto.identificacion?.pais" class="text-body-2">
                                            <v-icon icon="mdi-map-marker" size="x-small"></v-icon>
                                            {{ conjunto.identificacion.pais }}
                                        </p>
                                        <p class="text-body-2">
                                            <p>{{ conjunto.adicional?.presentacion || '(Sin descripción)' }}</p>
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

// Lista de conjuntos documentales
const { data: conjuntos } = await useFetch('/api/conjuntos') // reasignación de variable 'data' a 'conjuntos'

// Auxiliar para determinar el v-card del cual se desea ver más información
const revealId = ref(null)

/**
 * Función para borrar un conjunto de la base de datos
 * @param {string} id Id (de la base de datos) del conjunto que se desea borrar
 */
async function deleteConjunto(id){
    await $fetch(`/api/conjuntos/${id}`, {
        method: 'DELETE',
        query: { id: auth?.id }
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