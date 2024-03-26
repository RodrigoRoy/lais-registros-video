/**
 * State manager para las funciones de usuario
 * Cumple la función de tener variables y funciones globales
 */

export const useUserStore = defineStore('user', () => {
    // Determina si el usuario tiene sesión iniciada
    const isLoggedIn = ref(false)

    /**
     * Inicia sesión del usuario
     */
    function login() {
        isLoggedIn.value = true
    }

    /**
     * Cierra sesión del usuario
     */
    function logout() {
        isLoggedIn.value = false
    }

    return { isLoggedIn, login, logout }
})