<template>
    <v-card :color="color" :variant="variant" class="mx-auto" >
        <!-- Título -->
        <template v-slot:title>
            {{ data.identificacion?.titulo || '' }}
        </template>
        
        <!-- Código de referencia en pequeño -->
        <v-card-subtitle class="mt-n4 text-caption ">
            {{ data.identificacion?.codigoReferencia || '' }}
        </v-card-subtitle>
        
        <!-- Información del conjunto -->
        <v-card-text class="mt-n2">
            <p>
                <!-- Fecha -->
                <span v-if="data.identificacion?.fecha" class="text-caption text--primary mr-3">
                    <v-icon icon="mdi-calendar-blank"></v-icon>
                    {{ data.identificacion.fecha }}
                </span>
                
                <!-- Lugar -->
                <span v-if="data.identificacion?.pais" class="text-body-2">
                    <v-icon icon="mdi-map-marker"></v-icon>
                    {{ data.identificacion.pais }}
                </span>
            </p>

            <!-- Alcance y contenido, a una línea con opción de mostrar texto completo -->
            <p class="text-body-2">
                <span :class="{'d-block': !showFullText, 'text-truncate': !showFullText}">
                    {{ data.contenidoEstructura?.alcanceContenido || '(Sin descripción)' }}
                </span>
                <v-btn icon="mdi-chevron-down" variant="plain" size="x-small" @click="showFullText = true" v-if="!showFullText"></v-btn>
            </p>
        </v-card-text>

        <v-card-actions v-if="auth.isLoggedIn && auth.canCreate">
            <conjunto-new-btn :data="data"></conjunto-new-btn>
            <video-new-btn :data="data"></video-new-btn>
        </v-card-actions>
        
        <!-- Botón para ver detalles -->
        <template v-slot:append>
            <NuxtLink :to="`/conjuntos/${data._id}`" class="text-decoration-none">
                <v-btn class="d-none d-sm-flex" append-icon="mdi-arrow-right-bold" variant="elevated" elevation="3" :color="color">
                    Detalles
                </v-btn>
                <v-btn class="d-flex d-sm-none" rounded="lg" icon="mdi-arrow-right-bold" size="small" variant="elevated" elevation="3" :color="color">
                </v-btn>
            </NuxtLink>
        </template>
    </v-card>
</template>

<script setup>
defineProps({
    data: {type: Object, required: true},
    variant: {type: String, default: 'flat'},
    color: {type: String, default: ''},
})

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Determina si se muestra la descripción/presentación textual del conjunto
const showFullText = ref(false)
</script>