<template>
  <NuxtLayout>
    <v-app class="rounded rounded-md">

      <!-- Mensaje de retroalimentación a usuarios -->
      <v-snackbar v-model="snackbar.state" :color="snackbar.color" :location="snackbar.location">
        {{ snackbar.message }}
        <template v-slot:actions>
            <v-btn icon="mdi-close" @click="snackbar.state = false"></v-btn>
        </template>
      </v-snackbar>

      <AppBar></AppBar>
      
      <NavigationDrawer></NavigationDrawer>
      
      <v-main class="align-center justify-center" style="min-height: 300px;">
        <NuxtPage />
        <Footer></Footer>
      </v-main>

    </v-app>
  </NuxtLayout>
</template>


<script setup>
// // State manager
import { useWebsiteStore } from '@/stores/website'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
const website = useWebsiteStore()
const auth = useAuthStore()
const message = useMessageStore()

// Propiedades (reactivas) de los mensajes en pantalla
const snackbar = computed(() => {
  return message.snackbar
})

// Antes de montar el componente principal, establecer los datos del usuario
// es decir, si existe un token guardado, cargar en memoria la información
onBeforeMount(async () => {
  await auth.setUserData()
  website.setValues()
})
</script>