<template>
    <v-list lines="three">
        <v-list-subheader v-show="props.results.length > 0">{{ type === 'video' ? 'Unidades documentales': 'Grupos documentales' }}</v-list-subheader>

        <nuxt-link v-for="data in limitedResults" :to="type === 'video' ? `/videos/${data._id}` : `/conjuntos/${data._id}`" @click="$emit('click-result')" style="text-decoration: none; color: inherit">
            <v-list-item link :prepend-avatar="`/data/image/${data.adicional?.imagen}`">
                <v-list-item-title>
                    {{ type === 'video' ? data.identificacion.codigoReferencia : data.identificacion.titulo }}
                </v-list-item-title>
                
                <v-list-item-subtitle>
                    {{ type === 'video' ? data.contenidoEstructura?.descripcionGeneral : data.adicional.presentacion }}
                </v-list-item-subtitle>
            </v-list-item>
        </nuxt-link>
    </v-list>
    <div class="d-flex justify-center">
        <v-btn v-show="showMore" append-icon="mdi-arrow-right-bold" :color="color" variant="text" size="small">
            Más resultados
        </v-btn>
    </div>
</template>

<script setup>
const props = defineProps(['type', 'results', 'max', 'color'])
defineEmits(['click-result'])

// Nuevo array 'results' de tamaño 'props.max'
const limitedResults = computed(() => {
    return props.results.slice(0, props.max)
})
// Si la longitud de los resultados excede props.max
const showMore = computed(() => {
    return props.results.length > props.max
})

</script>