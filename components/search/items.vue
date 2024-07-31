<template>
    <v-list lines="three">
        <nuxt-link v-for="data in results" :to="`/videos/${data._id}`" @click="$emit('click-result')" style="text-decoration: none; color: inherit">
            <v-list-item link :prepend-avatar="`/data/image/${data.adicional?.imagen}`">
                <v-list-item-title>
                    {{ data.identificacion?.codigoReferencia }}
                </v-list-item-title>
                
                <v-list-item-subtitle>
                    {{ data.contenidoEstructura?.descripcionGeneral }}
                </v-list-item-subtitle>
            </v-list-item>
        </nuxt-link>
    </v-list>
</template>

<script setup>
defineProps(['results'])
defineEmits(['click-result'])
</script>