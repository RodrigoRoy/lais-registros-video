/**
 * State manager para las funciones de usuario
 * Cumple la función de tener variables y funciones globales
 */
export const useAuthStore = defineStore('auth', () => {
    // Determina si el usuario tiene sesión iniciada
    const isLoggedIn = ref(false)

    // Información del usuario
    // const user = reactive(null)

    /**
     * Inicia sesión del usuario.
     * Crea un token con la información del usuario y se almacena en localStorage
     * @param {string} user - Nombre de usuario o email
     * @param {string} password - Contraseña como texto simple
     */
    async function login(user, password) {
        if(!user && !password) return createError({statusCode: 400, statusMessage: 'No data provided'})
        
        // Obtener token del usuario
        const token = await $fetch('/api/auth', {
            method: 'POST',
            body: {
                name: user,
                password: password
            },
        })
        
        // Detener la ejecución del código en caso de error con token
        if(!token) return createError({statusCode:400, statusMessage: 'Auth error'})
        
        // Guardar token en memoria
        localStorage.setItem('token', token)

        // Establecer el state value ("variable global") de que el usuario tiene sesión iniciada
        isLoggedIn.value = true
    }

    /**
     * Cierra sesión del usuario.
     * Borra el token correpondiente en localStorage.
     */
    async function logout() {
        // Eliminar token de memoria
        localStorage.removeItem('token')
        // Establecer el state value ("variable global") de que el usuario no tiene sesión iniciada
        isLoggedIn.value = false
        // Ir a página de inicio
        await navigateTo('/')
    }

    return { isLoggedIn, login, logout }
})