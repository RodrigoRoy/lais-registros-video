// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

// Theme configuration
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'

// Translations provided by Vuetify
import { es, en } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // Temas de color
    theme: {
        defaultTheme: 'dark',
        themes: {
          light: {
            colors:{
              primary: '#1976D2',
              secondary: '#424242',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
            },
          },
          dark: {
            colors: {
              primary: colors.indigo.lighten1,
              secondary: colors.orange.darken1,
              accent: colors.shades.black,
              error: colors.red.accent3,
            },
          }
        },
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
