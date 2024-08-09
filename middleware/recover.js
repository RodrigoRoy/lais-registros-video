/**
 * Middleware para impedir el ingreso al formulario de cambio de contraseña
 * sin los parámetros correctos.
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on server side entirely
    if (import.meta.server){
        return
    }

    // second call for middleware from the client
    // on the client side, localStorage is available
    if (import.meta.client){
        // Negar acceso sin URL query
        if(!to.query?.u && !to.query?.id)
            return navigateTo('/login')

        // Verificar id de usuario
        const { data:user, error } = await useFetch(`/api/usuarios/${to.query.u}`)
        if(error.value)
            return navigateTo('/registro')

        // Si el usuario no tiene petición de recuperación
        if(!user.value.recover?._id)
            return navigateTo('/login')

        // Si el id de recuperación es inválido
        if(user.value.recover._id != to.query.id)
            return navigateTo('/login')

        // Si el usuario no tiene fecha de expiración
        if(!user.value.recover?.expire)
            return navigateTo('/login')

        // Si la petición de recuperación expiró
        if(new Date().getTime() > Date.parse(user.value.recover.expire))
            return navigateTo('/login')
        
        return
    }
})
