<template>
  <NuxtLayout>
    <v-app class="rounded rounded-md">
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
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Antes de montar el componente principal, establecer los datos del usuario
// es decir, si existe un token guardado, cargar en memoria la información
onBeforeMount(async () => {
  await auth.setUserData()
})
</script>