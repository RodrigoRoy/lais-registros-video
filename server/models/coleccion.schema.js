// import { defineMongooseDiscriminatorModel } from '#nuxt/mongoose'
// import { ConjuntoSchema } from './conjunto.schema'

// export const ColeccionSchema = defineMongooseDiscriminatorModel({
//     name: 'Coleccion',
//     baseModel: ConjuntoSchema,
//     schema: {
//         identificacion: {
//             volumenSoporte: {type: 'string', trim: true}, // autogenerado?
//             coordinacion: {type: 'string', trim: true},
//         },
//         contexto: {
//             historiaInstitucional: {type: 'string', trim: true},
//             historiaArchivistica: {type: 'string', trim: true},
//         },
//         contenidoEstructura: {
//             nuevosIngresos: {type: 'string', trim: true},
//             organizacion: {type: 'string', trim: true},
//         },
//         controlDescripcion: {
//             reglasNormas: {type: 'string', trim: true},
//         },
//     },
//     options: {
//         discriminatorKey: 'tipo'
//     }
// })