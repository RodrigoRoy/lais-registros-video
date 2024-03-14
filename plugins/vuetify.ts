// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createApp } from 'vue'
import { createVuetify, type ThemeDefinition } from 'vuetify'

// Creación de temas personalizables
const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
            myCustomLightTheme,
        }
    }
  })
  app.vueApp.use(vuetify)
})
