<template>
    <v-btn @click="newVideo()" v-if="(data.adicional?.child?.length === 0 && data.adicional?.videos?.length === 0) || data.adicional?.videos?.length !== 0" :prepend-icon="icon" :variant="variant">
        Nueva unidad
    </v-btn>
</template>

<script setup>
const props = defineProps({
    data: {type: Object, required: true},
    variant: {type: String, default: 'outlined'},
    color: {type: String, default: ''},
    icon: {type: String, default: 'mdi-plus'},
})

// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Códigos de referencia recomendados
const { data: codigoReferencia} = await useFetch(`/api/conjuntos/code/${props.data._id}?type=video`)

/**
 * Crea un nuevo registro de video y envia al formulario de edición.
 * El nuevo registro tiene asignado automáticamente un código de referencia,
 * la referencia al conjunto contenedor y se guarda como borrador.
 */
async function newVideo(){
    // Representación del registro de video que será enviado a la base de datos
    const video = {
        identificacion: {
            codigoReferencia: codigoReferencia.value.last || null,
            fecha: new Date(),
            lugar: null,
            pais: null,
            duracion: null,
            personasEntrevistadas: null,
            entrevista: null,
            camara: null,
            iluminacion: null,
            asistencia: null,
            sonido: null,
        },
        contenidoEstructura: {
            descripcionGeneral: null,
            estructuraFormal: null,
            descriptorOnomastico: null,
            descriptorToponimico: null,
        },
        condicionesAccesoUso: {
            idiomaOriginal: null,
            soporte: null,
            numeroCasetes: null,
            color: null,
            audio: null,
            resolucionGrabacion: null,
            formatoVideoDigital: null,
            requisitosTecnicos: null,
        },
        documentacionAsociada: {
            unidadesDescripcionRelacionadas: null,
            documentosAsociados: null,
        },
        notas: {
            notas: null,
        },
        controlDescripcion: {
            documentalista: auth?.id || null,
        },
        adicional: {
            updates: [],
            imagen: '',
            clipVideo: '',
            documentoCalificacion: '',
            location: {
                lat: null,
                lng: null,
            },
            isPublic: true,
            isDraft: true,
            bookmarkedBy: [],
            parent: props.data._id,
            fetchCount: 0,
            playCount: 0,
            inReview: true,
        },
    }

    // Guardar nueva unidad documental en base de datos
    const newVideo = await $fetch('/api/videos/nuevo', {
            method: 'POST',
            body: JSON.parse(JSON.stringify(video)),
            query: { id: auth?.id},
        })

    // Actualizar referencia del conjunto padre
    await $fetch(`/api/conjuntos/hierarchy/${newVideo.adicional.parent}`, {
        method: 'PUT',
        query: {id: newVideo._id, type: "video"}
    })


    // Guardar borrador en listado de borradores del usuario
    await $fetch(`/api/drafts/videos/user/${auth?.id}`, {
        method: 'PUT',
        body: JSON.parse(JSON.stringify(newVideo)),
    })


    // Reenviar a página de edición
    await navigateTo(`/videos/${newVideo._id}/edit`)
}
</script>