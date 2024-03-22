import { defineMongooseModel } from '#nuxt/mongoose'

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
            estructuraFormal: {type: 'string', enum: ['Grabación en campo', 'Registro con entrevista', 'Registro de materiales', 'Entrevista controlada', 'Entrevista en campo', 'Entrevista con imágenes', 'Entrevista con acción']},
            descriptorOnomastico: {type: 'string', trim: true},
            descriptorToponimico: {type: 'string', trim: true},
        },
        condicionesAccesoUso: {
            idiomaOriginal: {type: 'string', trim: true},
            soporte: {type: 'string', enum: ['Betacam', 'Hi8', 'DVCAM', 'MiniDV', 'Archivo digital']},
            numeroCasetes: {type: 'string', trim: true},
            color: {type: 'string', enum: ['Color', 'Blanco y negro']},
            audio: {type: 'string', enum: ['Dolby', 'Dolby Digital', 'Estéreo', 'Estéreo mezclado', 'Monoaural', 'Mono']},
            sistemaGrabacion: {type: 'string', enum: ['NTSC', 'PAL', 'SECAM']},
            resolucionGrabacion: {type: 'string', enum: ['UHD 8K', 'UHD 4K', 'HD 1080p', 'HD 1080i', 'HD 720', 'HD 720p', 'HD 720i', 'PAL 576i', 'NTSC 480i']},
            formatoVideoDigital: {type: 'string', enum: ['MP4', 'MTS', 'AVCHD', 'MOV', 'XAVC']},
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
            documentalista: {type: 'string', trim: true},
        },
        adicional: {
            imagen: {type: 'string', trim: true},
            clipVideo: {type: 'string', trim: true},
            documentoCalificacion: {type: 'string', trim: true},
            isPublic: {type: 'boolean', default: true},
            location: {
                lat: {type: 'number'},
                lng: {type: 'number'},
            }
        },
    },
    
    options: {
        timestamps: true, // enable 'createdAt', 'updatedAt'
        collection: 'videos'
    },
    
    hooks(schema) {
        schema.virtual('duracionString').get(function(){
            if(!this.duracion) return ''
            return `${this.duracion} s`
        })
    }
})