import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()

/**
 * Middleware para detectar si el usuario tiene permisos de creación.
 * NOTA: Se recomienda usar el middleware "auth" previamente, para
 * asegurar que la información del usuario es consistente.
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on server side entirely
    if (import.meta.server){
        return
    }

    // second call for middleware from the client
    // on the client side, localStorage is available
    if (import.meta.client){
        if(auth.canCreate)
            return
        else{
            // Comprobación en caso de escribir la URL directamente:
            if(to.path != from.path)
                return navigateTo(from.fullPath)
            // En caso de que la navegación haya sido por nuxt-link:
            return navigateTo(`/usuarios/${auth.id}`)
        }
    }
})
