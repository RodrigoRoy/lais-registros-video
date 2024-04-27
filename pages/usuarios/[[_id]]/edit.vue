<template>
    <!-- TODO: Formulario para edición de usuario.
    Debe incluir los campos:
    - name
    - fullname
    - email
    - operation.read
    - operation.create
    - operation.update
    - opearation.delete
    - admin
    - active -->

    <!-- NOTA: Solo si eres admin autenticado (con sesión iniciada), puedes ver los campos de operation, admin, active -->
    {{ usuario }}
    <!-- {{ auth }} -->
</template>

<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Composable para obtener parametros desde URL
const route = useRoute()

// Información del usuario
const usuario = await $fetch(`/api/usuarios/${route.params._id}`)
</script>