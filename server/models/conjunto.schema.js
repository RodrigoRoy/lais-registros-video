import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'

/**
 * Definición del modelo para representar un conjunto documental.
 * El conjunto documental representa dos modelos simultaneos: Colección y Grupo Documental.
 * Muchas de las propiedades son compartidas, a menos que se indique lo contrario en los comentarios.
 * La propiedad "tipo" define a cuál de los dos modelos representa ("Colección" o "Grupo documental")
 * Por lo tanto, queda como responsabilidad de quien programa el identificar y asignar correctamente las propiedades correspondientes.
 */
export const ConjuntoSchema = defineMongooseModel({
    name: 'Conjunto',
    schema: {
        identificacion: {
            // COMPARTIDOS
            codigoReferencia: {type: 'string', required: true, trim: true, unique: true },
            pais: {type: 'string', trim: true}, // autogenerado?
            fecha: {type: 'date'}, // autogenerado?
            nivelDescripcion: {type: 'string', enum: ['Colección', 'Grupo', 'Subgrupo', 'Serie', 'Subserie', 'Unidad compuesta']}, // autogenerado? exclusivo de coleccion?
            titulo: {type: 'string', required: true, trim: true}, // exclusivo de coleccion?

            // NIVEL COLECCION
            volumenSoporte: {type: 'string', trim: true}, // autogenerado?
            coordinacion: {type: 'string', trim: true},

            // NIVEL GRUPO DOCUMENTAL
            proyectoInvestigacion: {type: 'string', trim: true},
            entidadProductora: {type: 'string', trim: true},
            investigacion: {type: 'string', trim: true},
            coordinacionProyecto: {type: 'string', trim: true},
            coordinacionProduccionAudiovisual: {type: 'string', trim: true},
            
            // lugar: {type: 'string', trim: true}, // autogenerado? // no incluido en manual?
        },
        contexto: {
            // COMPARTIDOS
            semblanzaBiografica: {type: 'string', trim: true},

            // NIVEL COLECCION
            historiaInstitucional: {type: 'string', trim: true},
            historiaArchivistica: {type: 'string', trim: true},

            // NIVEL GRUPO DOCUMENTAL
            // (vacio)
        },
        contenidoEstructura: {
            // COMPARTIDOS
            alcanceContenido: {type: 'string', trim: true},
            valoracionSeleccionEliminacion: {type: 'string', trim: true},

            // NIVEL COLECCION
            nuevosIngresos: {type: 'string', trim: true},
            organizacion: {type: 'string', trim: true},

            // NIVEL GRUPO DOCUMENTAL
            // (vacio)
        },
        condicionesAccesoUso: {
            // COMPARTIDOS
            condicionesAcceso: {type: 'string', enum: ['Usos reservados para consulta in situ', 'Usos no lucrativos', 'Usos lucrativos']},
            condicionesReproduccion: {type: 'string', trim: true},

            // NIVEL COLECCION
            // (vacio)
            // NIVEL GRUPO DOCUMENTAL
            // (vacio)
        },
        notas: {
            // COMPARTIDOS
            notas: {type: 'string', trim: true},
            
            // NIVEL COLECCION
            // (vacio)
            // NIVEL GRUPO DOCUMENTAL
            // (vacio)
        },
        controlDescripcion: {
            // COMPARTIDOS
            documentalista: [{type: Types.ObjectId, ref: 'Usuario'}],
            // fechaCreacion = createdAt
            // fechaActualizacion = updatedAt

            // NIVEL COLECCION
            reglasNormas: {type: 'string', trim: true},

            // NIVEL GRUPO DOCUMENTAL
            // (vacio)
        },
        adicional: {
            imagen: {type: 'string', trim: true},
            documentoCalificacion: {type: 'string', trim: true},
            presentacion: {type: 'string', trim: true},
            isPublic: {type: 'boolean', default: true}, // define si el registro es público
            tipo: {type: 'string', enum: ['Colección', 'Grupo documental']},
            isDraft: {type: 'boolean', default: 'false'},
            fetchCount: {type: 'number', default: 0},
            parent: {type: Types.ObjectId, ref: 'Conjunto'},
            child: [{type: Types.ObjectId, ref: 'Conjunto'}],
            depth: {type: 'number', default: 0},
        },
    },
    
    // Opciones adicionales del modelo
    options: {
        // Habilita propiedades 'createdAt' (fecha de creación) y 'updatedAt' (fecha de última modificación)
        timestamps: true, // enable 'createdAt', 'updatedAt'
        // Nombre en la base de datos (por convención se pluraliza)
        collection: 'conjuntos',
        // Nombre de la propiedad para identificar discriminador o tipo de Conjunto (mecanismo de herencia)
        // discriminatorKey: 'tipo',
    },
})