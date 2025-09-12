<template>
    <v-container v-for="usuario in sortedUsuarios" :key="usuario.id" class="border mb-8">
        <h3 class="text-h6 mb-2">{{ usuario.nombre }}</h3>
        
        <v-data-table v-if="usuario.review.length > 0" :headers="dataTableHeaders" :items="usuario.review" density="comfortable" hide-no-data :hide-default-footer="usuario.review?.length <= usersForPage" hover :items-per-page="usersForPage" :no-filter="true">
            <!-- Portada -->
            <template v-slot:item.portada="{ item }">
                <v-img v-if="item.adicional?.imagen" :src="`/data/image/${item.adicional.imagen}`" cover></v-img>
                <v-img v-else src="~/assets/Logo LAIS.png" cover class="bg-blue-grey-darken-4"></v-img>
            </template>
            <!-- Botones de acción (ver, editar) -->
            <template v-slot:item._id="{ item }">
                <nuxt-link :to="`/conjuntos/${item._id}`" class="text-decoration-none">
                    <v-tooltip text="Detalles del conjunto" location="top">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-checkbook-arrow-right" color="primary" variant="ghost">
                            </v-btn>
                        </template>
                    </v-tooltip>
                </nuxt-link>
            </template>
        </v-data-table>

        <div v-else class="text-center font-italic font-weight-thin text-primary">
            No tiene conjuntos asignados para revisión.
        </div>
    </v-container>
</template>


<script setup>
const props = defineProps({
    usuarios: Array
})

const usersForPage = ref(5)

const sortedUsuarios = computed(() => {
  return props.usuarios.sort((a, b) => b.review.length - a.review.length)
})

/**
 * Devuelve las columnas de la tabla
 * @param indice El indice del usuario que esta en la lista 'usuarios'
 */
const dataTableHeaders = [
    {
        title: 'Portada', 
        key: 'portada', 
        sortable: false
    },
    {
        title: 'Código de referencia', 
        key: 'codigoReferencia', 
        value: (item) => item?.identificacion?.codigoReferencia || '', 
        sortable: true},
    {
        title: 'Titulo', 
        key: 'titulo', 
        value: (item) => item?.identificacion?.titulo || '', 
        sortable: true
    },
    {
        title: 'Acciones', 
        key: '_id', 
        sortable: false
    },
]

</script>