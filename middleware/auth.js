import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()

export default defineNuxtRouteMiddleware((to, from) => {
    if(auth.isLoggedIn)
        return
    return navigateTo('/login')
})