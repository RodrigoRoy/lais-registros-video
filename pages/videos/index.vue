<template>
    <v-container>
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="(video, i) in data" :key="video._id" class="d-flex child-flex" cols="12" sm="4">
                <v-hover>
                    <!-- <template> permite asignar variables cuando el mouse hace acción :hover -->
                    <template v-slot:default="{ isHovering, props }">
                        <!-- Cada elemento es un <v-card> que contiene información básica -->
                        <v-card v-bind="props" :color="isHovering ? 'teal-darken-4' : undefined" class="mx-auto" max-width="400">
                            
                            <!-- incluir <v-img> hace que la imagen aparezca como encabezado -->
                            <v-img class="align-end text-white" height="200" :src="`/data/image/${video.adicional.imagen}`" cover>
                            </v-img>

                            <!-- No hay <v-card-title> porque quedaría sobre la imagen -->
                            <v-card-subtitle class="pt-4">
                                <p>{{ video.identificacion.codigoReferencia }}</p>
                                <p>{{ video.identificacion.fecha }}</p>
                            </v-card-subtitle>

                            <!-- Resto del texto básico -->
                            <v-card-text>
                                <p>{{ video.contenidoEstructura.descripcionGeneral }}</p>
                            </v-card-text>

                            <!-- Acciones / botones para mostrar más información o redirigir a otra página -->
                            <v-card-actions>
                                <v-btn color="secondary" variant="text" @click="revealId = i">Detalles</v-btn>
                                <nuxt-link :to="`/videos/${video._id}`"><v-btn color="secondary" variant="text" class="text-decoration-none">Ver registro</v-btn></nuxt-link>
                            </v-card-actions>

                            <!-- "Cortina" para mostrar información adicional sobre el <v-card> -->
                            <v-expand-transition>
                                <v-card v-if="revealId === i" class="position-absolute w-100" height="100%" style="bottom: 0;">
                                    <v-card-text class="pb-0">
                                        <p class="text-h5 text--primary">
                                            {{ video.identificacion.codigoReferencia }}
                                        </p>
                                        <p class="text--primary">
                                            <p>{{ video.contenidoEstructura.descripcionGeneral }}</p>
                                        </p>
                                    </v-card-text>
                                    <v-card-actions class="pt-0">
                                        <v-btn color="teal-accent-4" variant="text" @click="revealId = null">Close</v-btn>
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
// Obtener información de la base de datos
const { data } = await useFetch('/api/videos')

// Auxiliar para determinar el v-card del cual se desea ver más información
const revealId = ref(null)
</script>