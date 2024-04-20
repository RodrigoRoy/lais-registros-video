import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()

/**
 * Middleware para detectar si el usuario tiene permisos de admnistración.
 * En caso de no tener sesión iniciada, se redirige a /login
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on server side entirely
    if (import.meta.server){
        return
    }

    // second call for middleware from the client
    // on the client side, localStorage is available
    if (import.meta.client){
        await auth.setUserData()
        if(auth.isAdmin)
            return
        else
            return navigateTo('/login')
    }
})
