import { useUserStore } from '@/stores/user'
const user = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
    if(user.isLoggedIn)
        return
    return navigateTo('/login')
})