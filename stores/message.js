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
    })
    
    /**
     * Mostrar mensaje/snackbar en pantalla con la configuración dada
     * @param {string} options.text Texto o mensaje a mostrar
     * @param {string} options.color Color contextual
     */
    function show(options){
        snackbar.state = true
        snackbar.color = options.color || ''
        snackbar.text = options.text || ''
    }
    
    return { snackbar, show }
})