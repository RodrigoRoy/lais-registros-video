<template>
    <span v-if="visibilidad && auth.isLoggedIn && auth.isAdmin" class="my-10 px-5">
        <v-select v-if="props.uso!=='aprobar'" label="Revisor" :items="items" item-title="fullname" item-value="_id" variant="outlined" :hint="mensajeHint" persistent-hint v-model="IdUsuario" class="mb-5" bg-color="black" color="secondary" :base-color="IdUsuario.length>0 ? 'secondary' : 'black'" rounded  ></v-select>
    
        <v-tooltip :text=mensajeTooltip location="top">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" :prepend-icon=icon variant="tonal" color="secondary" @click="botonAccion">
                    {{ textoBoton }}
                </v-btn>
            </template>
        </v-tooltip>
    </span>
</template>

<script setup>

const props = defineProps({
    // Usos permitidos: 'aprobar', 'video', 'conjunto'
    uso: { type: String, required: true },
    id: { type: Array, required: true }
})

// State manager
import { useAuthStore } from '@/stores/auth';
import { useMessageStore } from '@/stores/message'

// Emit para que la página 'revisiones' haga un refresh de los datos
const emit = defineEmits(['refreshMyData'])

const auth = useAuthStore()
const message = useMessageStore()

const { data: items } = await useFetch('/api/usuarios')

const IdUsuario = ref([])  // Variable a modificar dependiendo la selección del usuario en el componente 'select'
const icon = ref("")
const mensajeHint = ref("")  // Mensaje para mostrar en botón como un 'tooltip'
const textoBoton =  ref("")   // Texto dentro del botón
const mensajeSnackbar = ref("")
const mensajeTooltip = ref("")
const visibilidad = ref(false)  // Permite mostrar el componente o no, depende si viene solo algún 'prop.uso' esperado

/**
 * Personalización del botón y mensajes de acuerdo a los casos posibles.
 * Casos posibles:
 * - Aprobar
 * - Conjunto
 * - Video
 */
switch ( props.uso.toLowerCase() ){
    case 'aprobar':
        visibilidad.value = true
        icon.value = "mdi-file-check-outline"
        mensajeTooltip.value = "Clic para aprobar el video"
        textoBoton.value = "Aprobar"
        mensajeSnackbar.value = "Aprobado por Chayanne :D"
        break
    case 'conjunto':
        visibilidad.value = true
        icon.value = "mdi-account-multiple-plus"
        mensajeTooltip.value = "Asignar como revisor al usuario seleccionado"
        mensajeHint.value = "Seleccionar al usuario para asignar este conjunto"
        textoBoton.value = "Asignar usuario"
        mensajeSnackbar.value = "Se ha asignado el usuario al conjunto"
        break
    case 'video':
        visibilidad.value = true
        icon.value = "mdi-account-multiple-plus"
        mensajeTooltip.value = "Asignar como revisor al usuario seleccionado"
        mensajeHint.value = "Seleccionar al usuario para asignar este video"
        textoBoton.value = "Asignar usuario"
        mensajeSnackbar.value = "Se ha asignado el usuario al video"
        break
    default:
        visibilidad.value = false
}

/**
 * Casos para acceder al API dependiendo del caso.
 * Casos posibles:
 * - Aprobar
 * - Conjunto
 * - Video
 */
async function botonAccion(){
    const body = ref({})
    if ( props.uso.toLowerCase() === 'aprobar' ){
        body.value = {
            video: props.id
        }
        
        await $fetch('/api/review/approved', {
            method: 'PUT',
            body: JSON.parse(JSON.stringify(body.value)),
        })

        // Emitir para que refresque los datos en la tabla. El emit llega hasta la página 'revisiones'
        emit('refreshMyData')

    } else if ( props.uso.toLowerCase() === 'conjunto' ){
        body.value = {
            usuario: IdUsuario,
            conjunto: props.id
        }

        await $fetch('/api/review/conjunto', {
            method: 'POST',
            body: JSON.parse(JSON.stringify(body.value)),
        })

    } else if ( props.uso.toLowerCase() === 'video' ){
        body.value = {
            video: props.id,
            usuario: IdUsuario
        }

        await $fetch('/api/review/video', {
            method: 'POST',
            body: JSON.parse(JSON.stringify(body.value)),
        })

    }

    // Muestra mensaje de información
    message.show({text: mensajeSnackbar.value, color: 'secondary', timeout: 4500})
}



</script>