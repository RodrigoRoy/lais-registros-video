<!-- Mensaje o aviso al usuario -->
<template>
    <v-snackbar :modelValue="active" @update:modelValue="active = $event" :color="color" :variant="variant" :timeout="timeout" :elevation="elevation" :rounded="rounded">
        <v-progress-circular v-show="loading" indeterminate></v-progress-circular>
        {{ text }}
        <template v-slot:actions>
            <v-btn v-show="closeable" icon="mdi-close" @click="active = false"></v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>
defineProps({
    active: {type: Boolean, required: true},
    text: {type: String, required: true},
    color: {type: String, default: ''},
    variant: {type: String, default: 'elevated'},
    timeout: {type: Number, default: 5000},
    rounded: {type: [Number, String], default: 0},
    elevation: {type: Number, default: 16},
    closeable: {type: Boolean, default: true},
    loading: {type: Boolean, default: false},
})
</script>