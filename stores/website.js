/**
 * State manager para las funciones principales de la interfaz de usuario.
 * Cumple la función de tener variables y funciones globales
 */

export const useWebsiteStore = defineStore('website', () => {
    // Determina si el Navigation Drawer es visible
    const isDrawerVisible = ref(false)

    /**
     * Activa o desactiva la visibilidad del Navigation Drawer
     */
    function toggleDrawer() {
        isDrawerVisible.value = !isDrawerVisible.value
    }

    return { isDrawerVisible, toggleDrawer }
})