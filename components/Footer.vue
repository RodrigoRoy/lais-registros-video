<template>
    <v-footer :app="true" color="primary" rounded="lg" absolute height="64px">
        <v-container fluid class="text-center py-0">
            <v-row align="center" class="py-0">
                <!-- Ocultar iconos en pantallas pequeñas -->
                <v-col v-if="mdAndUp">
                    <v-row >
                        <v-col align-self="start">
                            <v-row> 
                                <v-col align-self="center">
                                    <v-img height="35px" src="~/assets/Logo CONAHCYT.png"></v-img>
                                </v-col>
                                <v-col>
                                    <v-img height="45px" src="~/assets/Logo Mora.png"></v-img>
                                </v-col>
                                <v-col>
                                    <v-img height="45px" src="~/assets/Logo LAIS.png"></v-img>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
       
                <v-divider v-if="mdAndUp" vertical length="40" class="border-opacity-50 my-7" color="secondary"></v-divider>
                
                <v-col>
                    <!-- Licencia Creative Commons -->
                    <div class="text-caption mx-auto" max-width="400" height="60">
                        <p xmlns:cc="http://creativecommons.org/ns#">
                            <span v-show="smAndUp">
                                Este sitio está bajo una licencia
                            </span>
                            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;" class="text-secondary">
                                CC BY-NC-SA 4.0
                                <img style="height:20px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="">
                                <img style="height:20px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="">
                                <img style="height:20px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="">
                                <img style="height:20px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt="">
                            </a>
                        </p>
                        <p v-show="lgAndUp" class="font-italic text-caption">
                            Los contenidos son manifestaciones de libre expresión y no reflejan una postura institucional.
                        </p> 
                    </div>
                </v-col>
                
                <v-divider vertical length="40" class="border-opacity-50 my-7" color="secondary"></v-divider>

                <v-col>
                    <!-- Opciones extra (Acerca de, Contacto, Cerrar sesión) -->
                    <div class="text-body-2 mx-auto" max-width="350">
                        <v-btn variant="text" size="small">
                            <nuxt-link to="/about" color="inherit" style="text-decoration: none; color: inherit">
                                Acerca de
                            </nuxt-link>
                        </v-btn>
                        
                        <v-btn variant="text" size="small">
                            <nuxt-link to="mailto:lais@mora.edu.mx" external style="text-decoration: none; color: inherit">
                                Contacto
                            </nuxt-link>
                        </v-btn>
                        
                        <span v-show="smAndUp">
                            <v-btn v-if="!auth.isLoggedIn" variant="text" size="small"> 
                                <nuxt-link to="/login" style="text-decoration: none; color: inherit">
                                    Iniciar sesión 
                                </nuxt-link>
                            </v-btn>
                            <v-btn v-else variant="text" @click="cerrarSesion()" size="small">
                                Cerrar sesión
                            </v-btn>
                        </span>
                    </div>
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
const { smAndUp, mdAndUp, lgAndUp } = useDisplay()

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