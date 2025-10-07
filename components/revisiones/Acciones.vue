<template>
    <div v-if="visibilidad" class="my-10 px-5">
        <v-select v-if="props.uso!=='aprobar'" chips label="Usuarios" :items="usuariosItems" multiple variant="outlined" :hint="mensajeHint" persistent-hint v-model="usuarios" class="mb-5" bg-color="black" color="secondary" :base-color="usuarios.length>0 ? 'secondary' : 'black'" rounded  ></v-select>
    
        <v-btn :prepend-icon=icon variant="tonal" color="secondary" @click="infoAccion">
            {{ textoBoton }}
        </v-btn>
        
    </div>
</template>

<script setup>

const props = defineProps({
    // Usos permitidos: 'aprobar', 'video', 'conjunto'
    uso: { type: String, required: true },
    lista: { type: Array, required: false }
})

// State manager
import { useAuthStore } from '@/stores/auth';
import { useMessageStore } from '@/stores/message'

const auth = useAuthStore()
const message = useMessageStore()

const { data: items } = await useFetch('/api/usuarios')

// Usuarios para mostrar en el componente Select.
const usuariosItems = items.value.map( (user) => {
    return user.fullname
})

const usuarios = ref([])  // Variable a modificar dependiendo la selección del usuario en el componente 'select'
const icon = ref("")
const mensajeHint = ref("")
const textoBoton =  ref("")
const mensajeSnackbar = ref("")
const visibilidad = ref(false)  // Permite mostrar el componente o no, depende si viene solo algún 'prop.uso' esperado

switch ( props.uso.toLowerCase() ){
    case 'aprobar':
        visibilidad.value = true
        icon.value = "mdi-file-check-outline"
        textoBoton.value = "Aprobado por Chayanne"
        mensajeSnackbar.value = "Aprobado por Chayanne :D"
        break
    case 'conjunto':
        visibilidad.value = true
        icon.value = "mdi-account-multiple-plus"
        mensajeHint.value = "Seleccionar usuarios para asignar este conjunto"
        textoBoton.value = "Asignar usuarios"
        mensajeSnackbar.value = "Se han asignado los usuarios al conjunto"
        break
    case 'video':
        visibilidad.value = true
        icon.value = "mdi-account-multiple-plus"
        mensajeHint.value = "Seleccionar usuarios para asignar este video"
        textoBoton.value = "Asignar usuarios"
        mensajeSnackbar.value = "Se han asignado los usuarios al video"
        break
    default:
        visibilidad.value = false
}

async function infoAccion(){
    message.show({text: mensajeSnackbar.value, color: 'secondary', timeout: 4500})
    await new Promise(resolve => setTimeout(resolve, 5000))
}



</script>