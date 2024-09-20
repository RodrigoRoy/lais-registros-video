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
    '@vueuse/nuxt', // essential utilities (like useStorage)
    '@nuxt/image', // image optimization
    'dayjs-nuxt', // Parse, validate, manipulate, and display dates and times
    'nuxt3-leaflet', // Leaflet wrapper for interactive maps
    'nuxt-nodemailer', // servicio correo
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
  },
  image: {
    // options
    format: ['webp', 'jpg'],
    quality: 80,
  },
  dayjs: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  nodemailer: {
    from: '"John Doe" <john@doe.com>',
    host: 'smtp.mailtrap.io',
    port: 465,
    secure: true,
    auth: {
      user: 'john@doe.com',
      pass: '',
    },
  },
})
