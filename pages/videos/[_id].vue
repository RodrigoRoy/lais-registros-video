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
                        <div v-if="video.identificacion" class="mt-2 mb-4">
                            <div>
                                <p class=" text-h6 font-italic font-weight-light">Área de identificación</p>
                            </div>
                            <div v-if="video.identificacion?.codigoReferencia">
                                <p class="text-body-1 font-weight-medium text-secondary">Código de referencia</p>
                                <p class="text-body-1">{{ video.identificacion.codigoReferencia }}</p>
                            </div>
                            <div v-if="video.identificacion?.fecha">
                                <p class="text-body-1 font-weight-medium text-secondary">Fecha</p>
                                <p class="text-body-1">{{ $dayjs(video.identificacion.fecha).format('DD/MM/YYYY') }}</p>
                            </div>
                            <div v-if="video.identificacion?.lugar">
                                <p class="text-body-1 font-weight-medium text-secondary">Lugar</p>
                                <p class="text-body-1">{{ video.identificacion.lugar }}</p>
                            </div>
                            <div v-if="video.identificacion?.pais">
                                <p class="text-body-1 font-weight-medium text-secondary">Pais</p>
                                <p class="text-body-1">{{ video.identificacion.pais }}</p>
                            </div>
                            <div v-if="video.identificacion?.duracion">
                                <p class="text-body-1 font-weight-medium text-secondary">Duración</p>
                                <p class="text-body-1">{{ video.identificacion.duracion }}</p>
                            </div>
                            <div v-if="video.identificacion?.personasEntrevistadas">
                                <p class="text-body-1 font-weight-medium text-secondary">Personas que han sido entrevistadas</p>
                                <p class="text-body-1">{{ video.identificacion.personasEntrevistadas }}</p>
                            </div>
                            <div v-if="video.identificacion?.entrevista">
                                <p class="text-body-1 font-weight-medium text-secondary">Entrevista</p>
                                <p class="text-body-1">{{ video.identificacion.entrevista }}</p>
                            </div>
                            <div v-if="video.identificacion?.camara">
                                <p class="text-body-1 font-weight-medium text-secondary">Cámara</p>
                                <p class="text-body-1">{{ video.identificacion.camara }}</p>
                            </div>
                            <div v-if="video.identificacion?.iluminacion">
                                <p class="text-body-1 font-weight-medium text-secondary">Iluminación</p>
                                <p class="text-body-1">{{ video.identificacion.iluminacion }}</p>
                            </div>
                            <div v-if="video.identificacion?.asistencia">
                                <p class="text-body-1 font-weight-medium text-secondary">Asistencia</p>
                                <p class="text-body-1">{{ video.identificacion.asistencia }}</p>
                            </div>
                            <div v-if="video.identificacion?.sonido">
                                <p class="text-body-1 font-weight-medium text-secondary">Sonido</p>
                                <p class="text-body-1">{{ video.identificacion.sonido }}</p>
                            </div>
                        </div>

                        <div v-if="video.contenidoEstructura" class="mt-2 mb-4">
                            <div>
                                <p class="text-h6 font-italic font-weight-light">Área de contenido y estructura</p>
                            </div>
                            <div v-if="video.contenidoEstructura?.descripcionGeneral">
                                <p class="text-body-1 font-weight-medium text-secondary">Descripción general</p>
                                <p class="text-body-1">{{ video.contenidoEstructura.descripcionGeneral }}</p>
                            </div>
                            <div v-if="video.contenidoEstructura?.estructuraFormal">
                                <p class="text-body-1 font-weight-medium text-secondary">Estructura formal</p>
                                <p class="text-body-1">{{ video.contenidoEstructura.estructuraFormal }}</p>
                            </div>
                            <div v-if="video.contenidoEstructura?.descriptorOnomastico">
                                <p class="text-body-1 font-weight-medium text-secondary">Descriptor onomastico</p>
                                <p class="text-body-1">{{ video.contenidoEstructura.descriptorOnomastico }}</p>
                            </div>
                            <div v-if="video.contenidoEstructura?.descriptorToponimico">
                                <p class="text-body-1 font-weight-medium text-secondary">Descriptor toponimico</p>
                                <p class="text-body-1">{{ video.contenidoEstructura.descriptorToponimico }}</p>
                            </div>
                        </div>

                        <div v-if="video.condicionesAccesoUso" class="mt-2 mb-4">
                            <div>
                                <p class="text-h6 font-italic font-weight-light">Área de condiciones de acceso de uso</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.idiomaOriginal">
                                <p class="text-body-1 font-weight-medium text-secondary">Idioma original</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.idiomaOriginal }}</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.soporte">
                                <p class="text-body-1 font-weight-medium text-secondary">Soporte</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.soporte }}</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.numeroCasetes">
                                <p class="text-body-1 font-weight-medium text-secondary">Número de casetes</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.numeroCasetes }}</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.color">
                                <p class="text-body-1 font-weight-medium text-secondary">Color</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.color }}</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.audio">
                                <p class="text-body-1 font-weight-medium text-secondary">Audio</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.audio }}</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.sistemaGrabacion">
                                <p class="text-body-1 font-weight-medium text-secondary">Sistema de grabación</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.sistemaGrabacion }}</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.resolucionGrabacion">
                                <p class="text-body-1 font-weight-medium text-secondary">Resolución de grabación</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.resolucionGrabacion }}</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.formatoVideoDigital">
                                <p class="text-body-1 font-weight-medium text-secondary">Formato de video en digital</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.formatoVideoDigital }}</p>
                            </div>
                            <div v-if="video.condicionesAccesoUso?.requisitosTecnicos">
                                <p class="text-body-1 font-weight-medium text-secondary">Requisitos técnicos</p>
                                <p class="text-body-1">{{ video.condicionesAccesoUso.requisitosTecnicos }}</p>
                            </div>
                        </div>

                        <div v-if="video.documentacionAsociada" class="mt-2 mb-4">
                            <div>
                                <p class="text-h6 font-italic font-weight-light">Área de documentación asociada</p>
                            </div>
                            <div v-if="video.documentacionAsociada?.unidadesDescripcionRelacionadas">
                                <p class="text-body-1 font-weight-medium text-secondary">Unidades de descripción relacionadas</p>
                                <p class="text-body-1">{{ video.documentacionAsociada.unidadesDescripcionRelacionadas }}</p>
                            </div>
                            <div v-if="video.documentacionAsociada?.documentosAsociados">
                                <p class="text-body-1 font-weight-medium text-secondary">Documentos asociados</p>
                                <p class="text-body-1">{{ video.documentacionAsociada.documentosAsociados }}</p>
                            </div>
                        </div>

                        <div v-if="video.notas" class="mt-2 mb-4">
                            <div>
                                <p class="text-h6 font-italic font-weight-light">Área de notas</p>
                            </div>
                            <div v-if="video.notas?.notas">
                                <p class="text-body-1 font-weight-medium text-secondary">Notas</p>
                                <p class="text-body-1">{{ video.notas.notas }}</p>
                            </div>
                        </div>

                        <div v-if="video.controlDescripcion" class="mt-2 mb-4">
                            <div>
                                <p class="text-h6 font-italic font-weight-light">Área de control y descripción</p>
                            </div>
                            <div v-if="video.controlDescripcion?.documentalista">
                                <p class="text-body-1 font-weight-medium text-secondary">Documentalista</p>
                                <p class="text-body-1">{{ video.controlDescripcion.documentalista.fullname }}</p>
                            </div>
                            <div v-if="video.createdAt">
                                <p class="text-body-1 font-weight-medium text-secondary">Fecha de creación</p>
                                <p class="text-body-1">{{ $dayjs(video.createdAt).format('DD/MM/YYYY HH:mm') }}</p>
                            </div>
                            <div v-if="video.updatedAt">
                                <p class="text-body-1 font-weight-medium text-secondary">Fecha de última actualización</p>
                                <p class="text-body-1">{{ $dayjs(video.updatedAt).format('DD/MM/YYYY HH:mm') }}</p>
                            </div>
                        </div>
                        

                    </v-card>
                </v-sheet>
            </v-col>

            <v-col cols="4" align="center" >
                <v-sheet class="pa-2 ma-2" >
                        <v-card class="mx-auto bg-dark pa-2" elevation="12" height="auto" width="auto" >
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