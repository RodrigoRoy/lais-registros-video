<template>
    <v-card v-if="auth.isAdmin">
      <v-tabs v-model="tab" align-tabs="center" >
        <v-tab value="one">Usuarios</v-tab>
        <v-tab value="two">Conjunto</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <!-- Pestaña de usuarios -->
          <v-window-item value="one">
            <h2>Revisiones de usuarios</h2>

            <v-container>
              <revisiones-usuarios-tabla :usuarios="usuariosTabla" />
            </v-container>
          </v-window-item>
          
          <!-- Pestaña de conjuntos -->
          <v-window-item value="two">
            <!-- Conjuntos que tienes en revisión separado de los demás conjuntos de los usuarios -->
            <v-tooltip text="Conjuntos que tienes en revisión" location="right">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" :color="expand ? 'primary' : 'secondary'" variant="tonal" class="mb-3 mt-5"  @click="expand = !expand">
                       <v-icon left>mdi-file-document</v-icon>
                      <span class="font-weight-bold">Conjuntos en revisión</span>
                      <span class="ml-2 font-italic text-caption">{{ expand ? auth.fullname : conjuntoId.length  }}</span>
                    </v-btn>
                </template>
            </v-tooltip>
            <v-expand-transition v-if="conjuntoId.length > 0"> <!-- Si existe algun conjunto para revision -->
              <revisiones-conjuntos-tabla v-if="expand" :conjuntos="conjuntoId" :borde="true" @refresh-my-data-2="emitFunction()" />
            </v-expand-transition>
            
            <v-expand-transition v-else-if="expand">
              <div class="text-center font-italic font-weight-thin text-primary">
                No tiene conjuntos asignados para revisión.
              </div>
              
            </v-expand-transition>
            
            <v-divider v-if="expand" :thickness="3" class="border-opacity-100" color="primary"></v-divider>
            <h2 class="mt-10">Revisiones de conjuntos</h2>

            <v-container>
              <revisiones-conjuntos-tabla :conjuntos="conjuntos" :borde="false" @refresh-my-data-2="emitFunction()" />
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    <!-- Página a mostrar para cualquier usuario que no sea admin -->
    <v-card v-else>
      <h2 class="ma-8">
        Conjuntos en revisión:
        <span class="ml-5 font-italic">{{ conjuntoId.length }}</span>
      </h2>
      <v-container>
        <revisiones-conjuntos-tabla :conjuntos="conjuntoId" :borde="true" />
      </v-container>
    </v-card>
  </template>

<script setup>
definePageMeta({
  middleware: [
    'auth',
  ]
})

const tab = ref(null)

// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Datos de los usuarios
const { data: usuarios } = await useFetch('/api/usuarios', {method: 'GET', query: {review: true }})
const { data: conjuntos, refresh } = await useFetch('/api/conjuntos', {method: 'GET', query: {videos: true, review: true }})

// conjuntos del usuario que esta loggeado
const conjuntoId = ref([])  // Array de id's de conjuntos que le pertenecen al usuario
const conjuntosUsuario = ref([])  // Información del conjunto del usuario
const idUsuario = auth.id

/**
 * Comportamiento del Emit del hijo
 */
async function emitFunction(){
  // Refresh para actualizar información de 'conjuntos'
  await refresh()

  // Obtener los datos necesarios de los conjuntos que tiene el usuario loggeado
  conjuntoId.value = []
  for(const conjunto of conjuntos.value){
    if ( conjuntosUsuario.value.includes( conjunto._id )){
      conjuntoId.value.push(conjunto)
    }
  }

  // Refresh para que se actualice la información de videos del usuario, para visualización del 'v-expand-transition'
  await refresh()

}

// Dando la estructura para que se muestren en la tabla (Usuarios)
const usuariosTabla = ref([])
// Tomar solo la información necesaria en concreto para la tabla de Usuarios
for(const usuario of usuarios.value){
  let user = {
    id: usuario._id,
    nombre: usuario.fullname,
    review: usuario.review  // Array de los conjuntos a revisar de cada usuario
  }
  usuariosTabla.value.push(user)

  // Utilizar la información del usuario actual para saber su información
  if (usuario._id === idUsuario){
    conjuntosUsuario.value = usuario.review.map( item => item._id )
  }
}

// Obtener los datos necesarios de los conjuntos que tiene el usuario loggeado
for(const conjunto of conjuntos.value){
  if ( conjuntosUsuario.value.includes( conjunto._id )){
    conjuntoId.value.push(conjunto)
  }
}

// Variable para expandir tabla de conjuntos del usuario loggeado.
const expand = ref(false)

</script>