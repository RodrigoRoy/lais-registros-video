<template>
    <v-card :prepend-icon="user.profileImage ? '' : 'mdi-account'" :prepend-avatar="user.profileImage ? `/data/profile/${user.profileImage}` : ''" :title="user.fullname" @click="navigateTo(`/usuarios/${user._id}`)">
        <template v-slot:subtitle>
            {{ user.email }}
        </template>

        <!-- Menu para edición y borrado (requiere permisos) -->
        <template v-slot:append v-if="auth.isLoggedIn && auth.isAdmin">
            <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-dots-horizontal" variant="plain"></v-btn>
                </template>
                <!-- Lista de acciones para administración -->
                <v-list>
                    <!-- EDITAR -->
                    <v-list-item>
                        <nuxt-link v-if="auth.isAdmin" :to="`/usuarios/${user._id}/edit`" class="text-decoration-none"><v-btn>Editar</v-btn></nuxt-link>
                    </v-list-item>

                    <!-- DESACTIVAR -->
                    <v-list-item v-if="user._id !== auth.id">
                        <v-btn @click="$emit('switch-activation')">
                            <span v-if="!user.active">Activar</span>
                            <span v-else>Desactivar</span>
                        </v-btn>
                    </v-list-item>
                    
                    <!-- BORRAR -->
                    <v-list-item>
                        <!-- Opción para borrar con ventana emergente de confirmación -->
                        <v-dialog :max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps">Borrar</v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card max-width="400" prepend-icon="mdi-alert" color="error" variant="elevated" title="Borrar usuario" :text="`Por favor confirme la eliminación de ${user.fullname}. Esta operación no se puede revertir y la información almacenada se perderá.`" >
                                    <v-card-actions>
                                        <v-btn @click="isActive.value = false" variant="elevated" color="error">Cancel</v-btn>
                                        <v-btn @click="deleteUser(user._id); isActive.value = false" variant="plain">Borrar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
        
        <v-card-text>
            <!-- Usuario activo/inactivo -->
            <span>
                <v-icon size="x-small" :icon="user.active ? 'mdi-check' : 'mdi-close'"></v-icon>
                Usuario <span v-if="!user.active">in</span>activo
            </span>
            <br />

            <span class="text-secondary" v-if="user.admin">
                <v-icon size="x-small" icon="mdi-key"></v-icon>
                Administrador/a
            </span>
            <br />
            
            <!-- Permisos para ver -->
            <!-- <span :class="{'text-success': user.operation.read, 'text-error': !user.operation.read}">
                <v-icon size="x-small" :icon="user.operation.read ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                Ver
            </span>
            <br /> -->
            
            <!-- Permisos para crear -->
            <span :class="{'text-success': user.operation.create, 'text-error': !user.operation.create}">
                <v-icon size="x-small" :icon="user.operation.create ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                Crear
            </span>
            <br />
            
            <!-- Permisos para actualizar -->
            <span :class="{'text-success': user.operation.update, 'text-error': !user.operation.update}">
                <v-icon size="x-small" :icon="user.operation.update ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                Actualizar
            </span>
            <br />
            
            <!-- Permisos para borrar -->
            <span :class="{'text-success': user.operation.borrar, 'text-error': !user.operation.borrar}">
                <v-icon size="x-small" :icon="user.operation.borrar ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"></v-icon>
                Borrar
            </span>
        </v-card-text>
    </v-card>
</template>

<script setup>
defineProps(['user'])
defineEmits(['switch-activation'])

// State manager
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

/**
 * Función para borrar un usuario de la base de datos
 * @param {string} id Id (de la base de datos) del usuario que se desea borrar
 */
async function deleteUser(id){
    await useFetch(`/api/usuarios/${id}`, {
        method: 'DELETE',
    })

    // Reload data using native Nuxt util function
    try{
        await refreshNuxtData()
    }
    catch(error){
        createError({statusCode:400, statusMessage: 'Refresh Nuxt data error', message: error})
    }
}
</script>