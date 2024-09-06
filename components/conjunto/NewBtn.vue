<template>
    <v-btn @click="newConjunto()" v-if="(data.adicional?.child?.length === 0 && data.adicional?.videos?.length === 0) || data.adicional?.child?.length !== 0" :prepend-icon="icon" :variant="variant">
        Nuevo grupo
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
const { data: codigoReferencia} = await useFetch(`/api/conjuntos/code/${props.data._id}?type=conjunto`)

/**
 * Crea un nuevo registro de video y envia al formulario de edición.
 * El nuevo registro tiene asignado automáticamente un código de referencia,
 * la referencia al conjunto contenedor y se guarda como borrador.
 */
async function newConjunto(){
    // Representación del registro de video que será enviado a la base de datos
    // TODO: Determinar si es fondo o grupo documental
    const conjunto = {
        identificacion: {
            // colección y grupo documental
            codigoReferencia: codigoReferencia.value.last || null,
            pais: null,
            fecha: null,
            nivelDescripcion: (props.data.adicional.depth + 1) === 1 ? 'Fondo' : 'Grupo',
            titulo: codigoReferencia.value.last,
            
            // solo colección
            volumenSoporte: null,
            coordinacion: null,
            
            // solo grupo documental
            proyectoInvestigacion: null,
            entidadProductora: null,
            investigacion: null,
            coordinacionProyecto: null,
            coordinacionProduccionAudiovisual: null,
        },
        contexto: {
            // colección y grupo documental
            semblanzaBiografica: null,
            
            // solo colección
            historiaArchivistica: null,
            
            // solo grupo
            historiaInstitucional: null,
            formaIngreso: null,
        },
        contenidoEstructura: {
            // colección y grupo documental
            alcanceContenido: null,
            valoracionSeleccionEliminacion: null,
            
            // solo colección
            nuevosIngresos: null,
            organizacion: null,
        },
        condicionesAccesoUso: {
            // colección y grupo documental
            condicionesAcceso: null,
            condicionesReproduccion: null,
            
            // solo colección
            sistemaGrabacion: null,
        },
        notas: {
            notas: null,
        },
        controlDescripcion: {
            // colección y grupo documental
            documentalista: auth?.id || null,
            
            // solo colección
            reglasNormas: null,
        },
        adicional: {
            imagen: '',
            tipo: null,
            isPublic: true,
            isDraft: true,
            fetchCount: 0,
            parent: props.data._id || null,
            child: [],
            videos: [],
            depth: props.data.adicional.depth + 1,
        },
    }
    // Guardar nuevo conjunto en base de datos
    const newConjunto = await $fetch('/api/conjuntos/nuevo', {
            method: 'POST',
            body: JSON.parse(JSON.stringify(conjunto)),
            query: { id: auth?.id},
        })

    // Actualizar referencia del conjunto padre
    await $fetch(`/api/conjuntos/hierarchy/${newConjunto.adicional.parent}`, {
        method: 'PUT',
        query: {id: newConjunto._id, type: "conjunto"}
    })

    // Guardar borrador en listado de borradores del usuario
    await $fetch(`/api/drafts/conjuntos/user/${auth?.id}`, {
        method: 'PUT',
        body: JSON.parse(JSON.stringify(newConjunto)),
    })

    // Reenviar a página de edición
    await navigateTo(`/conjuntos/${newConjunto._id}/edit`)
}
</script>