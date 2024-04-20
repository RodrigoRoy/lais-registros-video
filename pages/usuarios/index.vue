<template>
    <h4 class="text-h4 pa-6 ma-2">
        Lista de usuarios
    </h4>

    <v-card>
        <v-list v-for="user in data" :key="user._id" lines="three">
            <v-list-item>

                <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250" max-width="800" width="100%" rounded >
                    <div widht="600">
                        <span class="text-h5 font-weight-black mr-2">{{ user.fullname }}</span>
                        <v-icon icon="mdi-star" size="x-small" v-if="user.admin"></v-icon>
                        <span class="text-subtitle-1 font-weight-thin font-italic ml-2">{{ user.name }}</span>  

                        <div class="text-body-2 font-weight-medium">
                            <p class="text-body-1"> {{ user.email }} </p>
                            
                            <!-- Permisos para ver -->
                            <span :class="{'text-success': user.operation.read, 'text-error': !user.operation.read}" class="mx-2">
                                <v-icon size="x-small" :icon="user.operation.read ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                                Ver
                            </span>

                            <!-- Permisos para crear -->
                            <span :class="{'text-success': user.operation.create, 'text-error': !user.operation.create}" class="mx-2">
                                <v-icon size="x-small" :icon="user.operation.create ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                                Crear
                            </span>

                            <!-- Permisos para actualizar -->
                            <span :class="{'text-success': user.operation.update, 'text-error': !user.operation.update}" class="mx-2">
                                <v-icon size="x-small" :icon="user.operation.update ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                                Actualizar
                            </span>

                            <!-- Permisos para borrar -->
                            <span :class="{'text-success': user.operation.borrar, 'text-error': !user.operation.borrar}" class="mx-2">
                                <v-icon size="x-small" :icon="user.operation.borrar ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                                Borrar
                            </span>
                        </div>
                        <nuxt-link :to="`/usuarios/${user._id}`">
                            <v-btn color="primary" variant="text">Página personal</v-btn>
                        </nuxt-link>
                    </div>
                </v-sheet>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script setup>
// Nota: descomentar middleware para incluir restricciones de acceso, comentar para pruebas rápidas
// definePageMeta({
//     middleware: [
//         'auth',
//         'admin',
//     ]
// })

// Datos de los usuarios
const { data } = await useFetch('/api/usuarios')
</script>
