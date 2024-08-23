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
              primary: '#A7D129', // lime, light green
              'primary-container': colors.lime.lighten2,
              // secondary: '#2C74B3', // blue
              secondary: colors.blue.darken1,
              'secondary-container': colors.lightBlue.lighten3,
              // accent: '#FFB300', // amber
              accent: colors.amber.base,
              'accent-container': colors.yellow.lighten2,

              background: colors.grey.lighten3,
              surface: colors.grey.lighten2,
              
              error: colors.red.darken3,
              info: colors.blue.darken3,
              success: colors.green.darken3,
              warning: colors.yellow.darken2,
            },
          },
          dark: {
            colors: {
              primary: '#A7D129', // lime, light green
              'primary-container': colors.lime.lighten2,
              // secondary: '#2C74B3', // blue
              secondary: colors.blue.darken1,
              'secondary-container': colors.lightBlue.lighten3,
              // accent: '#FFB300', // amber
              accent: colors.amber.base,
              'accent-container': colors.yellow.lighten2,

              background: colors.grey.darken4,
              surface: colors.grey.darken3,

              error: colors.red.darken3,
              info: colors.blue.darken3,
              success: colors.green.darken3,
              warning: colors.yellow.darken2,
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
