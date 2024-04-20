/**
 * State manager para las funciones de usuario
 * Cumple la función de tener variables y funciones globales
 */
export const useAuthStore = defineStore('auth', () => {
    // Determina si el usuario tiene sesión iniciada
    const isLoggedIn = ref(false)

    // Información del usuario
    const name = ref(null)
    const fullname = ref(null)
    const email = ref(null)
    const canCreate = ref(null)
    const canRead = ref(null)
    const canUpdate = ref(null)
    const canDelete = ref(null)
    const isAdmin = ref(null)

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

        // Inicializar datos de manera reactiva
        await setUserData()

        // Establecer el state value ("variable global") de que el usuario tiene sesión iniciada
        isLoggedIn.value = true
    }

    /**
     * Cierra sesión del usuario.
     * Borra el token correpondiente en localStorage.
     */
    async function logout() {
        // Reiniciar datos reactivos del usuario
        clearUserData()

        // Eliminar token de memoria
        localStorage.removeItem('token')
        
        // Establecer el state value ("variable global") de que el usuario no tiene sesión iniciada
        isLoggedIn.value = false
        
        // Ir a página de inicio
        await navigateTo('/login')
    }

    /**
     * Inicializa los datos del usuario.
     * Los datos se obtienen a partir de la decodificación del token (JWT)
     */
    async function setUserData() {
        // Obtener info del usuario
        const user = await $fetch('/api/auth/me', {
            method: 'POST',
            body: {
                token: localStorage.getItem('token')
            },
        })

        // En caso de error con API, negar valores e indicar el error
        if (!user) {
            clearUserData()
            isLoggedIn.value = false
            throw createError({statusCode: 400, statusMessage: 'Token error'})
        }

        // Establecer los valores del usuario a partir de la decodificación del token
        name.value = user.name ? user.name : ''
        fullname.value = user.fullname ? user.fullname : ''
        email.value = user.email ? user.email : ''
        canCreate.value = user.operation && user.operation.create ? user.operation : false
        canRead.value = user.operation && user.operation.read ? user.operation.read : true
        canUpdate.value = user.operation && user.operation.update ? user.operation.update : false
        canDelete.value = user.operation && user.operation.delete ? user.operation.delete : false
        isAdmin.value = user.admin ? user.admin : false

        // Indicar que la sesión está iniciada
        isLoggedIn.value = true
    }

    /**
     * Establece los valores predeterminados de la información del usuario
     */
    function clearUserData() {
        name.value = null
        fullname.value = null
        email.value = null
        canCreate.value = null
        canRead.value = null
        canUpdate.value = null
        canDelete.value = null
        isAdmin.value = null
    }

    return { login, logout, setUserData, isLoggedIn, name, fullname, email, canCreate, canRead, canUpdate, canDelete, isAdmin }
    
})