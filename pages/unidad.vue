<template>
    <div class="py-2 py-10">
        <h2 class="px-4">
            Fecha: 14 de marzo de 2024
        </h2>
        <h1 class="px-4">
            id de la unidad
        </h1>
    </div>
    
    <v-container class="" >
        <v-row no-gutters>
            <v-col align-self="start">
                <v-sheet class="pa-2 ma-2">
                    
                    <v-card  class=" mx-auto" elevation="12" height="auto" max-width="auto">
                        <div class="d-flex flex-row">
                            <v-tabs class="py-6 text-caption" v-model="tab" direction="vertical" bg-color="light-green-lighten-4">
                                    <v-tab value="option-1">
                                        <v-icon start>
                                            mdi-account
                                        </v-icon>
                                        Área de identificación
                                    </v-tab>
                                    <v-tab value="option-2">
                                        <v-icon start>
                                            mdi-lock
                                        </v-icon>
                                        Área de contenido y estructura
                                    </v-tab>
                                    <v-tab value="option-3">
                                        <v-icon start>
                                            mdi-access-point
                                        </v-icon>
                                        Área de acceso y uso
                                    </v-tab>
                                    <v-tab value="option-4">
                                        <v-icon start>
                                            mdi-access-point
                                        </v-icon>
                                        Área de documentación asociada
                                    </v-tab>
                                    <v-tab value="option-5">
                                        <v-icon start>
                                            mdi-access-point
                                        </v-icon>
                                        Área de notas
                                    </v-tab>
                                    <v-tab value="option-6">
                                        <v-icon start>
                                            mdi-access-point
                                        </v-icon>
                                        Área de control de la descripción
                                    </v-tab>
                            </v-tabs>
                            <v-window v-model="tab" class="px-4">
                                <v-window-item value="option-1">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                cosas del área de identificación
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="option-2">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                cosas del área de contenido y estructura
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="option-3">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                cosas del área de acceso y uso
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="option-4">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                cosas del área de documentación asociada
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="option-5">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                cosas del área de notas
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item value="option-6">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                cosas del área de control de la descripción
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                            </v-window>
                        </div>
                    </v-card>


                </v-sheet>
            </v-col>
            <v-col cols="4" align="center" >
                <v-sheet class="pa-2 ma-2">
                    <div class="d-flex flex-row bg-light-green-lighten-4 align-center" color="#DCEDC8">
                        <v-card  class=" mx-auto" elevation="12" height="auto" width="auto" variant="outlined">
                            <v-img :src="img" height="auto" width="auto"></v-img>
                            <v-img :src="img" height="auto" width="auto"></v-img>
                            <v-btn class="text-none" variant="outlined" size="small" rounded="xl">Documento de calificación</v-btn>
                            <br>
                            <v-btn class="text-none mt-3" variant="outlined" size="small" rounded="xl">Descargar PDF</v-btn>
                            <br>
                            {{ tab }}
                        </v-card>
                    </div>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
  const tab = ref(null)
  //const img = ref("https://img.freepik.com/vector-gratis/icono-claqueta-plano_1063-38.jpg")
  const img = ref('/imagenVideo.png')
  const color = ref('indigo')
</script>