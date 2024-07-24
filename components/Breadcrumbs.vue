<template>
    <v-breadcrumbs :items="items">
      <template v-slot:titulo="{ item }">
        {{ item.titulo }}
      </template>
    </v-breadcrumbs>
  </template>

<script setup>
defineProps(['items'])
</script>