/**
 * State manager para las funciones principales de la interfaz de usuario.
 * Cumple la función de tener variables y funciones globales
 */

// Biblioteca para uso de temas (color)
import { useTheme } from 'vuetify'

export const useWebsiteStore = defineStore('website', () => {
    // Determina si el Navigation Drawer es visible
    const isDrawerVisible = ref(false)

    // Usar funciones para temas (color)
    const theme = useTheme()

    // Nombre del tema de color
    const colorTheme = ref('dark')

    /**
     * Activa o desactiva la visibilidad del Navigation Drawer
     */
    function toggleDrawer() {
        isDrawerVisible.value = !isDrawerVisible.value
    }

    /**
     * Cambia el tema de color (tema 'dark' a tema 'light' y vicecersa)
     */
    function toggleTheme() {
        theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
        colorTheme.value = theme.global.name.value
        // Guardar tema en memoria
        localStorage.setItem('theme', colorTheme.value)
    }

    /**
     * Inicializa todos los valores de la interfaz de usuario
     */
    function setValues() {
        // Tema de color
        theme.global.name.value = localStorage.getItem('theme') || 'dark'
        colorTheme.value = theme.global.name.value
    }

    return { isDrawerVisible, colorTheme, setValues, toggleDrawer, toggleTheme }
})