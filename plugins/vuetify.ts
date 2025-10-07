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
              primary: '#8AA624', // lime, light green
              'primary-container': colors.lime.lighten2,

              secondary: '#153E90',
              'secondary-container': colors.lightBlue.lighten3,

              accent: '#FFC947',
              'accent-container': colors.yellow.lighten2,

              surface: colors.grey.lighten4,
              background: colors.grey.lighten5,

              tables: '#e2eaeeff',
              
              error: colors.red.darken3,
              info: colors.blue.darken3,
              success: colors.green.darken3,
              warning: colors.yellow.darken2,
            },
          },
          dark: {
            colors: {
              primary: '#8FD14F', // lime, light green
              'primary-container': colors.lime.lighten2,

              secondary: '#239BA7',
              'secondary-container': colors.lightBlue.lighten3,

              accent: '#EFF396',
              'accent-container': colors.yellow.accent1,

              surface: colors.shades.black,
              background: colors.grey.darken4,

              tables: '#010f12ff',

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
