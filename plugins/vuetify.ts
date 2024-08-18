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
              // Basada en paleta de color de Color Hunt
              // https://colorhunt.co/palette/451952662549ae445af39f5a
              primary: '#662549',
              secondary: '#AE445A',
              accent: '#F39F5A',
              
              error: colors.red.darken3,
              info: colors.blue.darken3,
              success: colors.green.darken3,
              warning: colors.yellow.darken2,
            },
          },
          dark: {
            colors: {
              // Basada en paleta de color de Color Hunt
              // https://colorhunt.co/palette/451952662549ae445af39f5a
              // primary: '#662549',
              // secondary: '#AE445A',
              // accent: '#F39F5A',

              // Basada en paleta de color de Color Hunt
              // https://colorhunt.co/palette/5f264a643a6b957777b0a4a4
              // primary: '#5F264A',
              // secondary: '#643A6B',
              // accent: '#957777',

              // Basada en paleta de color de Color Hunt
              // https://colorhunt.co/palette/000000282a3a735f32c69749
              // primary: '#282A3A',
              // secondary: '#735F32',
              // accent: '#C69749',

              // Basada en paleta de color de Color Hunt
              // primary: '#206A5D',
              // secondary: '#F58634',
              // accent: '#FFCC29',

              // Basada en paleta de color de Color Hunt
              // https://colorhunt.co/palette/161a3031304db6bbc4f0ece5
              // primary: '#31304D',
              // secondary: '#B6BBC4',
              // accent: '#F0ECE5',

              // Basada en paleta de color de Color Hunt (verde)
              // https://colorhunt.co/palette/0000003e432e616f39a7d129
              // primary: '#3E432E',
              // secondary: '#616F39',
              // accent: '#A7D129',

              // Basada en paleta de color de Color Hunt (verdes claros)
              // https://colorhunt.co/palette/00676940a5789dde8be6ff94
              primary: '#006769',
              secondary: '#40A578',
              accent: '#E6FF94',

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
