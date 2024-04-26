<template>
    <div class="py-2 py-10">
        <h2 class="px-4">
            {{ video.identificacion.fecha }}
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
                        <div class="d-flex flex-row">
                            <v-tabs class="py-6 text-caption" v-model="tab" direction="vertical" bg-color="light-green-lighten-4">
                                    <v-tab value="identificacion">
                                        <v-icon start>
                                            mdi-file-edit
                                        </v-icon>
                                        Área de identificación
                                    </v-tab>
                                    <v-tab value="contenidoEstructura">
                                        <v-icon start>
                                            mdi-image-text
                                        </v-icon>
                                        Área de contenido y estructura
                                    </v-tab>
                                    <v-tab value="condicionesAccesoUso">
                                        <v-icon start>
                                            mdi-video-input-component
                                        </v-icon>
                                        Área de acceso y uso
                                    </v-tab>
                                    <v-tab value="documentacionAsociada">
                                        <v-icon start>
                                            mdi-vector-link
                                        </v-icon>
                                        Área de documentación asociada
                                    </v-tab>
                                    <v-tab value="notas">
                                        <v-icon start>
                                            mdi-note
                                        </v-icon>
                                        Área de notas
                                    </v-tab>
                                    <v-tab value="controlDescripcion">
                                        <v-icon start>
                                            mdi-account
                                        </v-icon>
                                        Área de control de la descripción
                                    </v-tab>
                            </v-tabs>
                            <v-window v-model="tab" class="px-4">
                                <v-window-item value="identificacion">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                {{ video.identificacion || 'Área de identificación' }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="contenidoEstructura">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                {{ video.contenidoEstructura || 'Área de contenido y estructura' }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="condicionesAccesoUso">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                {{ video.condicionesAccesoUso || 'Área de condiciones de acceso y uso' }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="documentacionAsociada">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                {{ video.documentacionAsociada || 'Área de documentación asociada' }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="notas">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                {{ video.notas || 'Área de notas' }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="controlDescripcion">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                {{ video.controlDescripcion || 'Área de control de la descripción' }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                            </v-window>
                        </div>
                    </v-card>
                </v-sheet>
            </v-col>

            <v-col cols="4" align="center" >
                <v-sheet class="pa-2 ma-2" >
                        <v-card  class=" mx-auto bg-light-green-lighten-4" elevation="12" height="auto" width="auto" >
                            <v-img :src="`/data/image/${video.adicional.imagen}`" height="auto" width="auto"></v-img>
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