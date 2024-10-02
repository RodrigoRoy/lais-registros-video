<template>
    <v-card>
      <v-tabs v-model="tab" align-tabs="center" >
        <v-tab value="one">Usuarios</v-tab>
        <v-tab value="two">Conjunto</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <p>Revisiones de usuarios</p>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4" xl="3" v-for="usuario in usuarios" :key="usuario._id">
                  <v-list lines="one">
                    
                    <v-list-item>
                      Usuario: {{ usuario.fullname }}
                    </v-list-item>
                    
                    <v-list-item v-show="usuario.review?.length > 0">
                      <v-list lines="one">
                        Conjuntos en revisión por el usuario:
                        <v-list-item v-for="user in usuario.review" :key="n1" >
                          - {{ user }}
                        </v-list-item>
                      </v-list>
                    </v-list-item>

                    <v-list-item v-show="usuario.review?.length < 1" class="text-center font-italic font-weight-thin">
                      {{usuario.fullname}} no tiene conjuntos asignados para revisión.
                    </v-list-item>

                  </v-list>
                  <br>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          
          <v-window-item value="two">
            <p>Revisiones de conjuntos</p>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4" xl="3" v-for="conjunto in conjuntos" :key="conjunto._id">
                  <v-list lines="one">

                    <v-list-item>
                      Conjunto: {{ conjunto.identificacion.titulo }}
                    </v-list-item>

                    <v-list-item>
                      Videos dentro:
                      <v-list lines="one">
                        <v-list-item v-for="video in conjunto.adicional.videos" :key="n" :title="video" >
                          <span class="text-red">
                            No agarra la info correctamente, como puedo popular? :c {{ video.titulo }}
                          </span>
                        </v-list-item>
                      </v-list>
                    </v-list-item>

                    <v-list-item v-show="conjunto.adicional.review?.length > 0">
                      Conjunto revisado por:
                        <v-list-item v-for="conj in conjunto.adicional.review" :key="n2" >
                          - {{ conj }}
                        </v-list-item>
                    </v-list-item>

                    <v-list-item v-show="conjunto.adicional.review?.length < 1" class="text-center font-italic font-weight-thin">
                      El conjunto {{conjunto.identificacion.titulo}} no es revisado por ningún usuario
                    </v-list-item>

                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
  
        </v-window>
      </v-card-text>
    </v-card>
  </template>

<script setup>
definePageMeta({
  middleware: [
    'auth',
    'admin',
  ]
})

const tab = ref(null)

// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Datos de los usuarios
const { data: usuarios } = await useFetch('/api/usuarios', {method: 'GET', query: {fullname: true, review: true }})
const { data: conjuntos } = await useFetch('/api/conjuntos', {method: 'GET', query: {adicional: true, identificacion: true }})
const { data: videos } = await useFetch('/api/videos', {method: 'GET', query: {adicional: true, identificacion: true }})

/**
 * Reload data using native Nuxt util function
 */
async function refresh(){
    await refreshNuxtData()
}

</script>