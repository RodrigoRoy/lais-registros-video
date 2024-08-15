<template>
    <v-footer :app="true" color="primary" height="auto" rounded="lg" absolute>  
        <!-- class="d-flex flex-column"  -->
        <v-container  class="text-center py-0">
            <v-row no-gutters justify="space-around">
                <v-col v-if="logoHeight > 20" cols="12" sm="12" md="6" class="py-2">
                    <v-container class="text-center" >
                        <v-row no-gutters align="center" justify="center">
                            <v-col cols="4">
                                <v-img :height="logoHeight" src="~/assets/Logo CONAHCYT.png"></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-img :height="logoHeight" src="~/assets/Logo Mora.png"></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-img :height="logoHeight" src="~/assets/Logo LAIS.png"></v-img>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                
                <v-col cols="12" sm="12" md="6">
                    <v-container class="text-center">
                        <v-row v-if="logoHeight>20" no-gutters align="center" >
                            <v-col >
                                <v-btn variant="text">
                                    <nuxt-link to="/about" color="inherit" style="text-decoration: none; color: inherit">
                                        Acerca de
                                    </nuxt-link>
                                </v-btn>
                            </v-col>
                            <v-col >
                                <v-btn variant="text">
                                    <nuxt-link to="mailto:lais@mora.edu.mx" external style="text-decoration: none; color: inherit">
                                        Contacto
                                    </nuxt-link>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn v-if="!auth.isLoggedIn" color="" variant="text"> 
                                    <nuxt-link to="/login" style="text-decoration: none; color: inherit">
                                        Iniciar sesión 
                                    </nuxt-link>
                                </v-btn>
                                <v-btn v-else color="" variant="text" @click="cerrarSesion()">
                                    Cerrar sesión
                                </v-btn>
                            </v-col>
                        </v-row>
                        
                        <v-row justify="space-around">
                            <div>
                                <p class="text-caption" xmlns:cc="http://creativecommons.org/ns#" >
                                    Este sitio está bajo una licencia <a href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""></a>
                                </p>
                                <p class="font-italic text-caption">
                                    Los contenidos son manifestaciones de libre expresión y no reflejan una postura institucional.
                                </p> 
                            </div>
                        </v-row>
                    </v-container>  
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script setup>
// State manager
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { useDisplay } from 'vuetify'
const auth = useAuthStore()
const message = useMessageStore()
const { name } = useDisplay()

// Determina tamaños de logos según viewport
const logoHeight = computed(() => {
  switch (name.value) {
    case 'xs': return 20
    case 'sm': return 50
    case 'md': return 80
    case 'lg': return 100
    case 'xl': return 100
    case 'xxl': return 100
  }
  return undefined
})

/**
 * Cierra sesión del usuario activo
 */
async function cerrarSesion(){
    message.show({text: 'Cerrando sesión', color: 'info', loading: true, timeout: 2000})
    await new Promise(resolve => setTimeout(resolve, 2500))
    auth.logout()
    message.show({text: 'Sesión cerrada', color: 'success', timeout: 2000})
}
</script>