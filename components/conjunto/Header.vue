<template>
    <v-card :color="color" :variant="variant" class="mx-auto" >
        <!-- Título -->
        <template v-slot:title>
            {{ conjunto.identificacion?.titulo || '' }}
        </template>
        
        <!-- Código de referencia en pequeño -->
        <v-card-subtitle class="mt-n3 text-caption ">
            {{ conjunto.identificacion?.codigoReferencia || '' }}
        </v-card-subtitle>
        
        <!-- Información del conjunto -->
        <v-card-text>
            <p>
                <!-- Fecha -->
                <span v-if="conjunto.identificacion?.fecha" class="text-caption text--primary mr-3">
                    <v-icon icon="mdi-calendar-blank"></v-icon>
                    {{ conjunto.identificacion.fecha }}
                </span>
                
                <!-- Lugar -->
                <span v-if="conjunto.identificacion?.pais" class="text-body-2">
                    <v-icon icon="mdi-map-marker"></v-icon>
                    {{ conjunto.identificacion.pais }}
                </span>
            </p>

            <!-- Descripción / presentación a una línea con opción de mostrar texto completo -->
            <p class="text-body-2">
                <span :class="{'d-block': !showFullText, 'text-truncate': !showFullText}">
                    {{ conjunto.adicional?.presentacion || '(Sin descripción)' }}
                </span>
                <v-btn icon="mdi-chevron-down" variant="plain" size="x-small" @click="showFullText = true" v-if="!showFullText"></v-btn>
            </p>
        </v-card-text>
        
        <!-- Botón para ver detalles -->
        <template v-slot:append>
            <NuxtLink :to="`/conjuntos/${conjunto._id}`" class="text-decoration-none">
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
defineProps(['conjunto', 'variant', 'color'])

// Determina si se muestra la descripción/presentación textual del conjunto
const showFullText = ref(false)
</script>