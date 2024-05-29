<template>
    <v-footer :app="false" color="teal" height="auto" > 
        <!-- class="d-flex flex-column"  -->
        <v-container fill-height class="text-center">
            <v-row>
                <v-col xs="12" sm="12" md="6">
                    <v-container  fill-height class="text-center">
                        <v-row align="center">
                            <v-col >
                                <v-img height="100" src="~/assets/LogoCONAHCYT.png"></v-img>
                            </v-col>
                            <v-col >
                                <v-img height="100" src="~/assets/LogoMora.png"></v-img>
                            </v-col>
                            <v-col >
                                <v-img height="100" src="~/assets/LogoLAIS.png"></v-img>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>

                <v-col xs="12" sm="12" md="6">
                    <v-container>
                        <v-row align="end" >
                            <v-col >
                                <nuxt-link to="/about">
                                    <v-btn color="" variant="text">Acerca de</v-btn>
                                </nuxt-link>
                            </v-col>
                            <v-col >
                                <nuxt-link to="mailto:lais@mora.edu.mx">
                                    <v-btn color="" variant="text">Contacto</v-btn>
                                </nuxt-link>
                            </v-col>
                            <v-col >
                                <nuxt-link to="/login">
                                    <v-btn color="" variant="text">Inicio sesión</v-btn>
                                </nuxt-link>
                            </v-col>
                        </v-row>
                        
                        <v-row class="text-center">
                            <div>
                                <p xmlns:cc="http://creativecommons.org/ns#" >Este sitio está bajo una licencia <a href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""></a></p>
                                <p class="font-italic text-caption">Los contenidos son manifestaciones de libre expresión y no reflejan una postura institucional.</p> 
                            </div>
                        </v-row>
                    </v-container>  
                </v-col>
            </v-row>
        </v-container>


    </v-footer>
  </template>