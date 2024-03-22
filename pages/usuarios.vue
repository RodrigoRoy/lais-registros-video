<script setup>
const { data } = await useFetch('/api/usuarios')
</script>

<template>
    <div v-for="user in data">
        {{ user.fullname }} - {{ user.name }} - {{ user._id }}
    </div>
</template>
