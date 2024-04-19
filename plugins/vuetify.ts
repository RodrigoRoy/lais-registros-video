// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

// Theme configuration
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Translations provided by Vuetify
import { es, en } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // Temas de color
    theme: {
        defaultTheme: 'dark',
    },
    // Idiomas. Español (es) por default, inglés (en) como secundario
    locale: {
      locale: 'es',
      fallback: 'en',
      messages: { es, en }
    },
  })
  
  app.vueApp.use(vuetify)
})
