<template>
    <v-footer class="d-flex flex-column">
      <div class="bg-teal d-flex w-100 align-center px-4">
        <v-container fluid fill-height>
            <v-row align="end" justify="end" class="text-center">
                <v-col>
                    <p class="text-center">
                        Logos
                    </p>
                </v-col>
                <v-col>
                    <p class="text-center">
                        Logos
                    </p>
                </v-col>
                <v-col>
                    <p class="text-center">
                        Logos
                    </p>
                </v-col>
            </v-row>
            
            <v-row align="end" justify="end" class="text-center">
                <v-col>
                    <nuxt-link to="/about">
                        <v-btn color="" variant="text">Acerca de</v-btn>
                    </nuxt-link>
                </v-col>
                <v-col>
                    <nuxt-link to="mailto:lais@mora.edu.mx">
                        <v-btn color="" variant="text">Contacto</v-btn>
                    </nuxt-link>
                </v-col>
                <v-col>
                    <nuxt-link to="/login">
                        <v-btn color="" variant="text">Inicio sesión</v-btn>
                    </nuxt-link>
                </v-col>
            </v-row>

        </v-container>

      </div>
  
      <div class="px-4 py-2 bg-black text-center w-100">
        <p xmlns:cc="http://creativecommons.org/ns#" >Este sitio está bajo una licencia <a href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""></a></p>
        <p class="font-italic text-caption">Los contenidos son manifestaciones de libre expresión y no reflejan una postura institucional.</p> 
      </div>
    </v-footer>
  </template>