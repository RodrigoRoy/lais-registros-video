<template>
    <v-list lines="three">
        <v-list-subheader v-if="results.lenght != 0">{{ type === 'video' ? 'Unidades documentales': 'Grupos documentales' }}</v-list-subheader>

        <nuxt-link v-for="data in results" :to="type === 'video' ? `/videos/${data._id}` : `/conjuntos/${data._id}`" @click="$emit('click-result')" style="text-decoration: none; color: inherit">
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
</template>

<script setup>
defineProps(['type', 'results'])
defineEmits(['click-result'])
</script>