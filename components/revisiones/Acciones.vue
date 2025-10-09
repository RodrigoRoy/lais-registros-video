<template>
    <div v-if="visibilidad && auth.isLoggedIn && auth.isAdmin" class="my-10 px-5">
        <v-select v-if="props.uso!=='aprobar'" label="Revisor" :items="items" item-title="fullname" item-value="_id" variant="outlined" :hint="mensajeHint" persistent-hint v-model="IdUsuario" class="mb-5" bg-color="black" color="secondary" :base-color="IdUsuario.length>0 ? 'secondary' : 'black'" rounded  ></v-select>
    
        <v-tooltip :text=mensajeTooltip location="top">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" :prepend-icon=icon variant="tonal" color="secondary" @click="botonAccion">
                    {{ textoBoton }}
                </v-btn>
            </template>
        </v-tooltip>
    </div>
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

const auth = useAuthStore()
const message = useMessageStore()

const { data: items } = await useFetch('/api/usuarios')

const IdUsuario = ref([])  // Variable a modificar dependiendo la selección del usuario en el componente 'select'
const icon = ref("")
const mensajeHint = ref("")
const textoBoton =  ref("")
const mensajeSnackbar = ref("")
const mensajeTooltip = ref("")
const visibilidad = ref(false)  // Permite mostrar el componente o no, depende si viene solo algún 'prop.uso' esperado

switch ( props.uso.toLowerCase() ){
    case 'aprobar':
        visibilidad.value = true
        icon.value = "mdi-file-check-outline"
        mensajeTooltip.value = "Clic para poder aprobar el video"
        textoBoton.value = "Aprobar video"
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


    message.show({text: mensajeSnackbar.value, color: 'secondary', timeout: 4500})
    await new Promise(resolve => setTimeout(resolve, 5000))
}



</script>