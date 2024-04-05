/**
 * State manager para las funciones principales de la interfaz de usuario.
 * Cumple la función de tener variables y funciones globales
 */

export const useWebsiteStore = defineStore('website', () => {
    // Determina si el Navigation Drawer es visible
    const isDrawerVisible = ref(false)

    // Determina si el usuario tiene sesión iniciada
    const isLoggedIn = ref(false)

    /**
     * Activa o desactiva la visibilidad del Navigation Drawer
     */
    function toggleDrawer() {
        isDrawerVisible.value = !isDrawerVisible.value
    }

    /**
     * Inicia sesión del usuario
     */
    function login() {
        isLoggedIn = true
    }

    /**
     * Cierra sesión del usuario
     */
    function logout() {
        isLoggedIn = false
    }

    return { isDrawerVisible, toggleDrawer, isLoggedIn, login, logout }
})