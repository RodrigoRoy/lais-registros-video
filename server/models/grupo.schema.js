// import { defineMongooseDiscriminatorModel } from '#nuxt/mongoose'
// import { ConjuntoSchema } from './conjunto.schema'

// export const GrupoSchema = defineMongooseDiscriminatorModel({
//     name: 'Grupo',
//     baseModel: ConjuntoSchema,
//     schema: {
//         identificacion: {
//             proyectoInvestigacion: {type: 'string', trim: true},
//             entidadProductora: {type: 'string', trim: true},
//             investigacion: {type: 'string', trim: true},
//             coordinacionProyecto: {type: 'string', trim: true},
//             coordinacionProduccionAudiovisual: {type: 'string', trim: true},
//         }
//     },
//     options: {
//         discriminatorKey: 'tipo'
//     }
// })