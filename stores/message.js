/**
 * State manager para mostrar mensajes de retroalimentación.
 * Se utilizan en conjunto con snackbars en la interfaz.
 */
export const useMessageStore = defineStore('message', () => {
    /**
     * Propiedades del mensaje
     */
    const snackbar = reactive({
        state: false, // Visibilidad del mensaje
        color: '', // Color
        text: '', // Texto a mostrar
        location: 'bottom', // Ubicación
        variant: 'elevated', // Estilo visual
        timeout: 5000, // Tiempo activo (en milisegundos)
        elevation: 16, // Nivel de sombreado
        rounded: 0, // Redondez de esquinas
        close: true, // Mostrar icono para quitar
        loading: false, // Mostrar animación de carga
    })
    
    /**
     * Mostrar mensaje/snackbar en pantalla con la configuración dada
     * @param {string} options.text Texto o mensaje a mostrar
     * @param {string} options.color Color contextual
     * @param {string} options.location Ubicación ('top', 'bottom')
     * @param {string} options.variant Estilo ('text', 'shaped', 'outlined', 'tonal')
     * @param {number} options.timeout Tiempo activo (en milisegundos)
     * @param {number} options.elevation Nivel de sombreado
     * @param {number} options.rounded Redondez en esquinas
     * @param {boolean} options.close Muestra/oculta icono para cerrar
     * @param {boolean} options.loading Muestra/oculta animación de carga
     */
    function show(options){
        snackbar.state = true
        snackbar.color = options.color || ''
        snackbar.text = options.text || ''
        snackbar.location = options.location || 'bottom'
        snackbar.variant = options.variant || 'elevated'
        snackbar.timeout = options.timeout || 5000
        snackbar.elevation = options.elevation || 16
        snackbar.rounded = options.rounded || 0
        snackbar.close = options.close || true
        snackbar.loading = options.loading || false
    }
    
    return { snackbar, show }
})