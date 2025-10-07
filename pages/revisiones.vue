<template>
    <v-card v-if="auth.isAdmin">
      <v-tabs v-model="tab" align-tabs="center" >
        <v-tab value="one">Usuarios</v-tab>
        <v-tab value="two">Conjunto</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <h2>Revisiones de usuarios</h2>
            
            <v-container>
              <revisiones-usuarios-tabla :usuarios="usuariosTabla" />
            </v-container>
          </v-window-item>
          
          <v-window-item value="two">
            <v-tooltip text="Conjuntos que tienes en revisión" location="right">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" :color="expand ? 'primary' : 'secondary'" variant="tonal" class="mb-3 mt-5"  @click="expand = !expand">
                      <!-- Conjuntos en revision '{{ auth.fullname }}': {{ conjuntoId.length }} -->
                       <v-icon left>mdi-file-document</v-icon>
                      <span class="font-weight-bold">Conjuntos en revisión</span>
                      <span class="ml-2 font-italic text-caption">{{ expand ? auth.fullname : conjuntoId.length  }}</span>
                    </v-btn>
                </template>
            </v-tooltip>
            <v-expand-transition v-if="conjuntoId.length > 0"> <!-- Si existe algun conjunto para revision -->
              <revisiones-conjuntos-tabla v-if="expand" :conjuntos="conjuntoId" :borde="true" />
            </v-expand-transition>
            
            <v-expand-transition v-else-if="expand">
              <div class="text-center font-italic font-weight-thin text-primary">
                No tiene conjuntos asignados para revisión.
              </div>
              
            </v-expand-transition>
            
            <v-divider v-if="expand" :thickness="3" class="border-opacity-100" color="primary"></v-divider>
            <h2 class="mt-10">Revisiones de conjuntos</h2>
            
            <v-container>
              <revisiones-conjuntos-tabla :conjuntos="conjuntosTabla" :borde="false" />
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
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
const { data: conjuntos } = await useFetch('/api/conjuntos', {method: 'GET', query: {videos: true, review: true }})

// conjuntos del usuario que esta loggeado
const conjuntoId = ref([])
const conjuntosUsuario = ref([])
const idUsuario = auth.id

// Dando la estructura para que se muestren en la tabla (Usuarios)
const usuariosTabla = ref([])
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

// Dando la estructura para que se muestren en la tabla (Conjuntos)
const conjuntosTabla = ref([])
for(const conjunto of conjuntos.value){
  let cjt = {
    id: conjunto._id,
    titulo: conjunto.identificacion.titulo,
    review: conjunto.adicional.review,  // Array de revisadores de tipo Usuario
    videos: conjunto.adicional.videos   // Array de videos del conjunto de tipo Video
  }
  conjuntosTabla.value.push(cjt)
  
  // Obtener los datos necesarios de los conjuntos que tiene el usuario loggeado
  if ( conjuntosUsuario.value.includes( conjunto._id )){
    conjuntoId.value.push(cjt)
  }
}

const expand = ref(false)

/**
 * Reload data using native Nuxt util function
 */
async function refresh(){
    await refreshNuxtData()
}

</script>