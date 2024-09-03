<template>
    <breadcrumbs :items="breadcrumbsItems"></breadcrumbs>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12" md="8" align-self="start">
                <v-sheet class="pa-2 ma-2" color="background">
                    <v-card elevation="2" height="auto" max-width="auto" variant="flat" color="surface">
                        
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
                                        <nuxt-link v-if="auth.canUpdate" :to="`/conjuntos/${conjunto._id}/edit`" class="text-decoration-none"><v-btn>Editar</v-btn></nuxt-link>
                                    </v-list-item>
                                    
                                    <!-- BORRAR -->
                                    <v-list-item>
                                        <!-- Opción para borrar con ventana emergente de confirmación -->
                                        <v-dialog :max-width="500">
                                            <template v-slot:activator="{ props: activatorProps }">
                                                <v-btn v-bind="activatorProps">Borrar</v-btn>
                                            </template>
                                            <template v-slot:default="{ isActive }">
                                                <v-card max-width="400" prepend-icon="mdi-alert" color="error" variant="elevated" title="Borrar registro" :text="`Por favor confirme la eliminación del registro ${conjunto.identificacion.codigoReferencia}. Esta operación no se puede revertir y la información almacenada se perderá.`" >
                                                    <v-card-actions>
                                                        <v-btn @click="isActive.value = false" variant="elevated" color="error">Cancel</v-btn>
                                                        <v-btn @click="deleteData(conjunto, 'conjunto')" variant="plain">Borrar</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </template>
                                        </v-dialog>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>

                        <template v-slot:title>
                            <span class="text-medium-emphasis">
                                {{ conjunto.identificacion.titulo }}
                            </span>
                        </template>

                        <v-card-text>
                            <!-- Presentación del conjunto documental -->
                            <div v-if="conjunto.adicional?.presentacion">
                                <p class="text-body-1 font-weight-light mb-6">
                                    {{ conjunto.adicional.presentacion }}
                                </p>
                            </div>
                            <!-- ÁREA DE IDENTIFICACIÓN -->
                            <div v-if="conjunto.identificacion?.codigoReferencia || conjunto.identificacion?.pais || conjunto.identificacion?.fecha || conjunto.identificacion?.nivelDescripcion || conjunto.identificacion?.titulo || conjunto.identificacion?.volumenSoporte || conjunto.identificacion?.coordinacion || conjunto.identificacion?.proyectoInvestigacion || conjunto.identificacion?.entidadProductora || conjunto.identificacion?.investigacion || conjunto.identificacion?.coordinacionProyecto || conjunto.identificacion?.coordinacionProduccionAudiovisual" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de identificación</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <!-- Compartidos -->
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.codigoReferencia">
                                            <p class="text-body-1 font-weight-medium text-accent">Código de referencia </p>
                                            <p class="text-body-1">{{ conjunto.identificacion.codigoReferencia }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.titulo">
                                            <p class="text-body-1 font-weight-medium text-accent">Título</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.titulo }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.pais">
                                            <p class="text-body-1 font-weight-medium text-accent">País</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.pais }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.fecha">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecho o periodo</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.fecha }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.nivelDescripcion">
                                            <p class="text-body-1 font-weight-medium text-accent">Nivel de descripción</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.nivelDescripcion }}</p>
                                        </v-col>
                                        <!-- Colección -->
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.volumenSoporte">
                                            <p class="text-body-1 font-weight-medium text-accent">Volumen y soporte</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.volumenSoporte }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.coordinacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Coordinación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.coordinacion }}</p>
                                        </v-col>
                                        <!-- Grupo documental -->
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.proyectoInvestigacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Proyecto de investigación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.proyectoInvestigacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.entidadProductora">
                                            <p class="text-body-1 font-weight-medium text-accent">Entidad productora asociada</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.entidadProductora }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.investigacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Investigación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.investigacion }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.coordinacionProyecto">
                                            <p class="text-body-1 font-weight-medium text-accent">Coordinación del proyecto de investigación</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.coordinacionProyecto }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.identificacion?.coordinacionProduccionAudiovisual">
                                            <p class="text-body-1 font-weight-medium text-accent">Coordinación de producción audiovisual</p>
                                            <p class="text-body-1">{{ conjunto.identificacion.coordinacionProduccionAudiovisual }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTEXTO -->
                            <div v-if="conjunto.contexto?.semblanzaBiografica || conjunto.contexto?.historiaInstitucional || conjunto.contexto?.historiaArchivistica" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de contexto</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <!-- Compartidos -->
                                        <v-col cols="12" v-if="conjunto.contexto?.semblanzaBiografica">
                                            <p class="text-body-1 font-weight-medium text-accent">Semblanza biográfica</p>
                                            <p class="text-body-1">{{ conjunto.contexto.semblanzaBiografica }}</p>
                                        </v-col>
                                        <!-- Colección -->
                                        <v-col cols="12" v-if="conjunto.contexto?.historiaInstitucional">
                                            <p class="text-body-1 font-weight-medium text-accent">Historia institucional</p>
                                            <p class="text-body-1">{{ conjunto.contexto.historiaInstitucional }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contexto?.historiaArchivistica">
                                            <p class="text-body-1 font-weight-medium text-accent">Historia archivistica</p>
                                            <p class="text-body-1">{{ conjunto.contexto.historiaArchivistica }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTENIDO Y ESTRUCTURA-->
                            <div v-if="conjunto.contenidoEstructura?.alcanceContenido || conjunto.contenidoEstructura?.valoracionSeleccionEliminacion || conjunto.contenidoEstructura?.nuevosIngresos || conjunto.contenidoEstructura?.organizacion" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de contenido y estructura</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <!-- Compartidos -->
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.alcanceContenido">
                                            <p class="text-body-1 font-weight-medium text-accent">Alcance y contenido</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.alcanceContenido }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.valoracionSeleccionEliminacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Valoración, selección y eliminación</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.valoracionSeleccionEliminacion }}</p>
                                        </v-col>
                                        <!-- Colección -->
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.nuevosIngresos">
                                            <p class="text-body-1 font-weight-medium text-accent">Nuevos ingresos</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.nuevosIngresos }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.contenidoEstructura?.organizacion">
                                            <p class="text-body-1 font-weight-medium text-accent">Organización</p>
                                            <p class="text-body-1">{{ conjunto.contenidoEstructura.organizacion }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONDICIONES DE ACCESO DE USO -->
                            <div v-if="conjunto.condicionesAccesoUso?.condicionesAcceso || conjunto.condicionesAccesoUso?.condicionesReproduccion" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de condiciones de acceso y uso</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="conjunto.condicionesAccesoUso?.condicionesAcceso">
                                            <p class="text-body-1 font-weight-medium text-accent">Condiciones de acceso</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.condicionesAcceso }}</p>
                                        </v-col>
                                        <v-col cols="12" v-if="conjunto.condicionesAccesoUso?.condicionesReproduccion">
                                            <p class="text-body-1 font-weight-medium text-accent">Condiciones de reproducción</p>
                                            <p class="text-body-1">{{ conjunto.condicionesAccesoUso.condicionesReproduccion }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE NOTAS -->
                            <div v-if="conjunto.notas?.notas" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de notas</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" v-if="conjunto.notas?.notas">
                                            <p class="text-body-1 font-weight-medium text-accent">Notas</p>
                                            <p class="text-body-1">{{ conjunto.notas.notas }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- ÁREA DE CONTROL DE LA DESCRIPCIÓN -->
                            <div v-if="conjunto.controlDescripcion?.documentalista || conjunto.controlDescripcion?.reglasNormas" class="mt-2 mb-4">
                                <div>
                                    <p class="text-h6 font-italic font-weight-light">Área de control de la descripción</p>
                                </div>
                                <v-container>
                                    <v-row>
                                        <!-- Colección -->
                                        <v-col cols="12" v-if="conjunto.controlDescripcion.reglasNormas">
                                            <p class="text-body-1 font-weight-medium text-accent">Reglas o normas</p>
                                            <p class="text-body-1">{{ conjunto.controlDescripcion.reglasNormas }}</p>
                                        </v-col>
                                        <!-- Compartidos -->
                                        <v-col cols="12" sm="4" v-if="conjunto.controlDescripcion?.documentalista">
                                            <p class="text-body-1 font-weight-medium text-accent">Archivista</p>
                                            <p class="text-body-1">{{ conjunto.controlDescripcion.documentalista.fullname }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.createdAt">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecha de creación</p>
                                            <p class="text-body-1">{{ $dayjs(conjunto.createdAt).format('DD/MM/YYYY HH:mm') }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="4" v-if="conjunto.updatedAt">
                                            <p class="text-body-1 font-weight-medium text-accent">Fecha de actualización</p>
                                            <p class="text-body-1">{{ $dayjs(conjunto.updatedAt).format('DD/MM/YYYY HH:mm') }}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-col>

            <!-- Imagen de referencia y estadísticas -->
            <v-col cols="12" md="4" align="center">
                <v-sheet class="pa-2 ma-2" color="background">
                        <v-card elevation="2" height="auto" width="auto" variant="flat">
                            <img v-if="conjunto.adicional?.imagen" :src="`/data/image/${conjunto.adicional.imagen}`" width="100%" height="auto"></img>
                            <img v-else src="~/assets/Logo LAIS.png" width="100%" height="auto"></img>

                            <!-- Acciones / botón para mostrar más información -->
                            <v-card-actions>
                                <v-btn size="small" prepend-icon="mdi-chart-bar">{{ conjunto.adicional.fetchCount }}</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                </v-sheet>

                <!-- Descarga de documento pdf -->
                <v-sheet class="pa-2 ma-2" color="background">
                        <v-card elevation="2" height="auto" width="auto" variant="flat">
                            <conjunto-pdf :data="conjunto"></conjunto-pdf>
                        </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
const auth = useAuthStore()
const message = useMessageStore()

const dayjs = useDayjs()

// Composable para obtener parametros desde URL
const route = useRoute()

// Información del conjunto documental
const { data: conjunto } = await useFetch(`/api/conjuntos/${route.params._id}`)
// Breadcrumbs
const { data: breadcrumbsItems } = await useFetch(`/api/breadcrumbs`, { query: { id: conjunto.value._id, last: true } })

/**
 * Borrar conjunto de la base de datos
 * @param {Object} data Conjunto que se desea borrar
 */
 async function deleteData(data){
    if(!data?._id)
        return

    try {
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
    
        // Mostrar mensaje al usuario
        message.show({text: 'Conjunto borrado', color: "success"})
    
        if(data.adicional?.parent)
            navigateTo(`/nav?id=${data.adicional.parent}`)
        else
            navigateTo('/')
    } catch (error) {
        // Mostrar mensaje al usuario
        message.show({text: 'Error al borrar', color: "error"})
    }
}
</script>