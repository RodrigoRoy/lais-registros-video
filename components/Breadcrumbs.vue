<template>
    <v-breadcrumbs :items="computedItems">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>

      <template v-slot:titulo="{ item }">
        {{ item.titulo }}
      </template>
    </v-breadcrumbs>
  </template>

<script setup>
const { items } = defineProps({
  items: {
    type: Array,
    required: true
  }
})

// Accediendo a la baseURL en nuxt.config.ts
const baseUrl = useRuntimeConfig().app.baseURL

// Agrega baseUrl como prefijo a las rutas de cada item
const computedItems = computed(() => {
  return items.map(item => ({
    ...item,
    href: baseUrl + item.href.slice(1)
  }))
})

</script>
