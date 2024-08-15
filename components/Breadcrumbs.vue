<template>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>

      <template v-slot:titulo="{ item }">
        {{ item.titulo }}
      </template>
    </v-breadcrumbs>
  </template>

<script setup>
defineProps(['items'])
</script>