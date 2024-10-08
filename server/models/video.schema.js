import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'

// Definición del modelo para representar un registro de video (unidad documental)
export const VideoSchema = defineMongooseModel({
    name: 'Video',

    schema: {
        identificacion: {
            codigoReferencia: {type: 'string', required: true, trim: true, unique: true },
            fecha: {type: 'date'},
            lugar: {type: 'string', trim: true},
            pais: {type: 'string', trim: true},
            duracion: {type: 'number'}, // total de segundos
            personasEntrevistadas: {type: 'string', trim: true},
            entrevista: {type: 'string', trim: true},
            camara: {type: 'string', trim: true},
            iluminacion: {type: 'string', trim: true},
            asistencia: {type: 'string', trim: true},
            sonido: {type: 'string', trim: true},
        },
        contenidoEstructura: {
            descripcionGeneral: {type: 'string', trim: true},
            estructuraFormal: {type: 'string', enum: ['Entrevista controlada', 'Entrevista con imágenes', 'Entrevista en campo', 'Entrevista en campo con imágenes', 'Entrevista con acción', 'Entrevista con recorrido', 'Registro de campo', 'Reprografía']},
            descriptorOnomastico: {type: 'string', trim: true},
            descriptorToponimico: {type: 'string', trim: true},
        },
        condicionesAccesoUso: {
            idiomaOriginal: {type: 'string', trim: true},
            soporte: {type: 'string', enum: ['Betacam', 'Hi8', 'DVCAM', 'MiniDV', 'Archivo digital']},
            numeroCasetes: {type: 'string', trim: true},
            color: {type: 'string', enum: ['Color', 'Blanco y negro']},
            audio: {type: 'string', enum: ['Monoaural', 'Estéreo', 'Estéreo mezclado']},
            resolucionGrabacion: {type: 'string', enum: ['NTSC 480i', 'PAL 576i', 'HD 720', 'HD 1080', 'UHD 4K']},
            formatoVideoDigital: {type: 'string', enum: ['MP4', 'AVCHD', 'MOV', 'XAVC']},
            requisitosTecnicos: {type: 'string', trim: true},
        },
        documentacionAsociada: {
            unidadesDescripcionRelacionadas: {type: 'string', trim: true},
            documentosAsociados: {type: 'string', trim: true},
        },
        notas: {
            notas: {type: 'string', trim: true},
        },
        controlDescripcion: {
            documentalista: {type: Types.ObjectId, ref: 'Usuario'},
        },
        adicional: {
            updates: [{type: Types.ObjectId, ref: 'Usuario'}], // lista de personas que actualizan el registro de video
            imagen: {type: 'string', trim: true}, // referencia a la portada
            clipVideo: {type: 'string', trim: true}, // referencia al clip de video
            documentoCalificacion: {type: 'string', trim: true}, // referencia al pdf
            isPublic: {type: 'boolean', default: true}, // define si el registro es público
            location: { // geolocalización
                lat: {type: 'number'},
                lng: {type: 'number'},
            },
            isDraft: {type: 'boolean', default: false},
            inReview: {type: 'boolean', default: true},
            bookmarkedBy: [{type: Types.ObjectId, ref: 'Usuario'}],
            fetchCount: {type: 'number', default: 0},
            playCount: {type: 'number', default: 0},
            parent: {type: Types.ObjectId, ref: 'Conjunto'}
        },
    },
    
    // Opciones adicionales del modelo
    options: {
        // Habilita propiedades 'createdAt' (fecha de creación) y 'updatedAt' (fecha de última modificación)
        timestamps: true,
        // Nombre en la base de datos (por convención se pluraliza)
        collection: 'videos',
        // Propiedades generadas a partir de otras
        virtuals: {
            // Representación textual de la duración en segundos
            duracionString: {
                get() {
                    return this.identificacion.duracion ? `${this.identificacion.duracion} s` : ''
                }
            }
        },
    },

    // Schema Hooks Function to customize Model
    hooks(schema){
        // Creación de índices para búsqueda textual
        schema.index( {'$**': 'text'}, {
            name: 'videoTextSearch',
            weights: {
                'identificacion.codigoReferencia': 2,
                'identificacion.lugar': 4,
                'identificacion.entrevista': 3,
                'identificacion.personasEntrevistadas': 5,
                'contenidoEstructura.descripcionGeneral': 10,
                'contenidoEstructura.descriptorOnomastico': 3,
                'contenidoEstructura.descriptorToponimico': 3,
                'notas.notas': 2,
            },
        })
    },
})