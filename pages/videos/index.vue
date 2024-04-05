<template>
    <v-container class="bg-surface-variant">
        <v-row>
            <!-- Mostrar cuadricula de elementos. Se usa nomenclatura (element, index) para generar numeración -->
            <v-col v-for="(video, i) in data" :key="video._id" class="d-flex child-flex" cols="12" sm="4">
                <v-hover>
                    <!-- <template> permite asignar variables cuando el mouse hace acción :hover -->
                    <template v-slot:default="{ isHovering, props }">
                        <!-- Cada elemento es un <v-card> que contiene información básica -->
                        <v-card v-bind="props" :color="isHovering ? 'primary' : undefined" class="mx-auto" max-width="400">
                            
                            <!-- incluir <v-img> hace que la imagen aparezca como encabezado -->
                            <v-img class="align-end text-white" height="200" :src="`https://picsum.photos/500/300?image=${i*5+10}`" cover>
                            </v-img>

                            <!-- No hay <v-card-title> porque quedaría sobre la imagen -->
                            <v-card-subtitle class="pt-4">
                                <p>{{ video.identificacion.codigoReferencia }}</p>
                                <p>{{ video.identificacion.fecha }}</p>
                            </v-card-subtitle>

                            <!-- Resto del texto básico -->
                            <v-card-text>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas sed enim ut sem viverra aliquet. Donec et odio pellentesque diam.</p>
                            </v-card-text>

                            <!-- Acciones / botones para mostrar más información o redirigir a otra página -->
                            <v-card-actions>
                                <v-btn color="secondary" variant="text" @click="revealId = i">Detalles</v-btn>
                                <nuxt-link :to="`/video/${video._id}`"><v-btn color="secondary" variant="text" class="text-decoration-none">Ver registro</v-btn></nuxt-link>
                            </v-card-actions>

                            <!-- "Cortina" para mostrar información adicional sobre el <v-card> -->
                            <v-expand-transition>
                                <v-card v-if="revealId === i" class="v-card--reveal" style="height: 100%;">
                                    <v-card-text class="pb-0">
                                        <p class="text-h5 text--primary">
                                            {{ video.identificacion.codigoReferencia }}
                                        </p>
                                        <p class="text--primary">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas sed enim ut sem viverra aliquet. Donec et odio pellentesque diam.
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


<style>
/* Permite mostrar correctamente info en <v-expand-transition> */
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>