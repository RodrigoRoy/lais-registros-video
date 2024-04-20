<script setup>
    const { data } = await useFetch('/api/usuarios')
</script>

<template>
    <h1 class="text-h3 pa-6 ma-2">
        Lista de usuarios
    </h1>

    <v-card>
        <v-list v-for="user in data" lines="three">
            <v-list-item>

                <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250" max-width="800" width="100%" rounded >
                    <div>
                        <h2 class="text-h4 font-weight-black">{{ user.name }} 
                            <span v-show="user.admin">*(admin?)</span> <!-- si es admin, saldrá el asterisco -->
                            <span class="text-h6 font-weight-thin font-italic">{{ user.fullname }}</span>  
                        </h2>

                        <div class="text-h5 font-weight-medium">
                            <p> <!-- No sale el correo :c -->
                                (correo?){{ user.email }}
                            </p>
                            <v-container> <!-- Por que sucede esto? no se acomodan bien las operaciones -->
                                <v-row>
                                    <v-col :class="user.operation.read ? 'text-success' : 'text-error'" >
                                        <v-icon size="x-small" :icon="user.operation.read ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                                        Ver
                                    </v-col>
                                    <v-col :class="user.operation.create ? 'text-success' : 'text-error'" >
                                        <v-icon size="x-small" :icon="user.operation.create ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                                        Crear
                                    </v-col>
                                    <v-col :class="user.operation.update ? 'text-success' : 'text-error'" >
                                        <v-icon size="x-small" :icon="user.operation.update ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                                        Actualizar
                                    </v-col>
                                    <v-col :class="user.operation.delete ? 'text-success' : 'text-error'" >
                                        <v-icon size="x-small" :icon="user.operation.delete ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                                        Borrar
                                    </v-col>
                                </v-row> 
                            </v-container>
                        </div>
                        <nuxt-link to="/usuarios/{{ user.id }}">  <!-- Esto es correcto? La URL -->
                            <v-btn color="orange" variant="text">Página personal</v-btn>
                        </nuxt-link>
                    </div>
                </v-sheet>
            </v-list-item>
        </v-list>
    </v-card>


    <div v-for="user in data" >
        {{ user.name }} - (admin) {{ user.admin }} {{ user.fullname }}
        <br>
        {{ user.email }}
        <br>
        {{ user.operation.create }} - {{ user.operation.read }} - {{ user.operation.update }} - {{ user.operation.delete }}

    </div>
</template>
