// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    // my modules
    'nuxt-mongoose', // manejador de base de datos MongoDB (mongoose)
    '@pinia/nuxt', // state manager (pinia)
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  mongoose: {
    // Configuración de base de datos
    uri: process.env.MONGODB_URI, // URL de la conexión con MongoDB
    options: {
      dbName: process.env.MONGODB_DBNAME // nombre de la base de datos
    },
    modelsDir: 'models', // ubicación de los modelos
    devtools: process.env.NODE_ENV === 'development',
  }
})
