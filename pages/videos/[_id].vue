<template>
    <div class="py-2 py-10">
        <h2 class="px-4">
            {{ $dayjs(video.identificacion.fecha).format('DD/MM/YYYY') }}
        </h2>
        <h1 class="px-4">
            {{ video.identificacion.codigoReferencia }}
        </h1>
    </div>
    
    <v-container>
        <v-row no-gutters>
            <v-col align-self="start">
                <v-sheet class="pa-2 ma-2">
                    
                    <v-card  class=" mx-auto" elevation="12" height="auto" max-width="auto">
                        <!-- server/models/video.schema.js -->
                        <div v-if="video.identificacion">
                            <div>
                                <p class="text-h6">Área de identificación</p>
                            </div>
                            <div v-if="video.identificacion?.codigoReferencia">
                                <p class="text-body-1">Código de referencia</p>
                                <p class="text-body-2">{{ video.identificacion.codigoReferencia }}</p>
                            </div>
                            <div v-if="video.identificacion?.fecha">
                                <p class="text-body-1">Fecha</p>
                                <p class="text-body-2">{{ $dayjs(video.identificacion.fecha).format('DD/MM/YYYY') }}</p>
                            </div>
                            <div v-if="video.identificacion?.lugar">
                                <p class="text-body-1">Lugar</p>
                                <p class="text-body-2">{{ video.identificacion.lugar }}</p>
                            </div>
                        </div>

                        <div v-if="video.contenidoEstructura">
                            <div>
                                <p class="text-h6">Área de contenido y estructura</p>
                            </div>
                            <div v-if="video.contenidoEstructura?.descripcionGeneral">
                                <p class="text-body-1">Descripción general</p>
                                <p class="text-body-2">{{ video.contenidoEstructura.descripcionGeneral }}</p>
                            </div>
                            <div v-if="video.contenidoEstructura?.estructuraFormal">
                                <p class="text-body-1">Estructura formal</p>
                                <p class="text-body-2">{{ video.contenidoEstructura.estructuraFormal }}</p>
                            </div>
                        </div>

                    </v-card>
                </v-sheet>
                {{ video }}
            </v-col>

            <v-col cols="4" align="center" >
                <v-sheet class="pa-2 ma-2" >
                        <v-card class="mx-auto bg-light-green-lighten-4 pa-2" elevation="12" height="auto" width="auto" >
                            <v-img class="mb-2" :src="`/data/image/${video.adicional.imagen}`" height="auto" width="auto"></v-img>
                            <video controls width="100%" height="auto" >
                                <source :src="`/data/video/${video.adicional.clipVideo}`" />
                            </video>
                            <v-btn class="text-none" variant="outlined" size="small" rounded="xl">Documento de calificación</v-btn>
                            <br>
                            <v-btn class="text-none mt-3" variant="outlined" size="small" rounded="xl">Descargar PDF</v-btn>
                        </v-card>
                    
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
// Composable para obtener parametros desde URL
const route = useRoute()

// Nombre de la pestaña actual
const tab = ref('identificacion')

// Imagen de prueba
const testImage = ref('/imagenVideo.png')

// Información del registro de video
const video = await $fetch(`/api/videos/${route.params._id}`)
</script>