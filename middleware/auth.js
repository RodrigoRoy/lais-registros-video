import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()

/**
 * Middleware para detectar si el usuario tiene sesión iniciada.
 * En caso de no tener dicho permiso, se redirige a /login
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on server side entirely
    if (import.meta.server){
        return
    }

    // second call for middleware from the client
    // on the client side, localStorage is available
    if (import.meta.client){
        // confirm user status value
        await auth.setUserData()

        if(auth.isLoggedIn)
            return
        else
            return navigateTo('/login')
    }
})
