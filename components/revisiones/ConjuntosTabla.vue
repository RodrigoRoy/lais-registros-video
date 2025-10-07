<template>
    <v-container v-for="conjunto in sortedConjuntos" :key="conjunto.id" class="border mb-8" :class="props.borde===true ? 'border-secondary' : ''">
        <h2 class="text-h6 mb-2">
            {{ conjunto.titulo }}
            <!-- Link para ver los detalles del conjunto -->
            <nuxt-link :to="`/conjuntos/${conjunto.id}`" class="text-decoration-none">
                <v-tooltip :text="`Detalles del conjunto ${ conjunto.titulo }`" location="top">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" icon="mdi-checkbook-arrow-right" color="primary" variant="ghost">
                        </v-btn>
                    </template>
                </v-tooltip>
            </nuxt-link>
        </h2>
        <h3 v-if="conjunto.review.length > 0">
            <span v-for="(revisor, i) in conjunto.review">
                <span class="mx-3 text-primary">{{ i === 0 ? 'Revisores:' : '|' }}</span> 
                 {{ revisor.fullname }}
            </span>
        </h3>

        <div v-else class="text-center font-italic font-weight-thin text-primary">
            No tiene revisores asignados.
        </div>
        
        <v-data-table v-if="conjunto.videos.length > 0" :headers="dataTableHeaders" :items="conjunto.videos" density="comfortable" hide-no-data :hide-default-footer="conjunto.videos?.length <= videosForPage" hover :items-per-page="videosForPage" :no-filter="true" class="bg-tables">
            <!-- Documentalista -->
            <template v-slot:item.documentalista="{ item }">
                {{ item.controlDescripcion.documentalista.fullname }}
            </template>
            <!-- Fecha -->
            <template v-slot:item.fecha="{ item }">
                {{ formatoFecha(item.identificacion.fecha) }}
            </template>
            <!-- Botones de acción (ver, editar) -->
            <template v-slot:item._id="{ item }">
                <nuxt-link :to="`/videos/${item._id}`" class="text-decoration-none">
                    <v-tooltip text="Detalles del video" location="top">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-checkbook-arrow-right" color="primary" variant="ghost">
                            </v-btn>
                        </template>
                    </v-tooltip>
                </nuxt-link>
            </template>
        </v-data-table>

        <div v-else class="text-center font-italic font-weight-thin text-primary">
            No tiene videos por revisar.
        </div>
    </v-container>
</template>


<script setup>
const props = defineProps({
    conjuntos: Array,
    borde: Boolean
})

const videosForPage = ref(5)
// Biblioteca para mostrar fechas
const dayjs = useDayjs()

const sortedConjuntos = computed(() => {
  return props.conjuntos.sort((a, b) => b.videos.length - a.videos.length)
})

/**
 * Devuelve las columnas de la tabla
 * @param indice El indice del conjunto que esta en la lista 'conjuntos'
 */
const dataTableHeaders = [
    {
        title: 'Código de referencia', 
        key: 'codigoReferencia', 
        value: (item) => item?.identificacion?.codigoReferencia || '', 
        sortable: true},
    {
        title: 'Documentalista', 
        key: 'documentalista', 
        value: (item) => item?.videos || 'Sin documentalista', 
        sortable: true
    },
    {
        title: 'Fecha del registro', 
        key: 'fecha', 
        value: item => item?.videos || 'Sin fecha',
        sortable: true
    },
    {
        title: 'Acciones', 
        key: '_id', 
        sortable: false
    },
]

function formatoFecha(fecha){
    return dayjs(fecha).format('DD/MM/YYYY')
}

</script>