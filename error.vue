<template>
  <div class="text-center">
      <h1 class="text-red">{{ error.statusCode }}</h1>
      <h2>{{ error.message }}</h2>
      <p class="my-5 text-subtitle-1 font-weight-thin">{{ error.stack }}</p>
      <v-btn rounded="xl" size="x-large" class="mt-4" elevated color="red" @click="handleError">Regresar a inicio</v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

