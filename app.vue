<template>
  <NuxtLayout>
    <v-layout class="rounded rounded-md">
      <AppBar></AppBar>
      
      <!-- <NavigationDrawer></NavigationDrawer> -->
      
      <v-main class="align-center justify-center" style="min-height: 300px;">
        <NuxtPage />
        <Footer></Footer>
      </v-main>

    </v-layout>
  </NuxtLayout>
</template>
