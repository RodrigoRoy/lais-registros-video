import { defineMongooseModel } from '#nuxt/mongoose'
import bcrypt from 'bcrypt'
import { Types } from 'mongoose'

// Definición del modelo para representar un usuario
export const UsuarioSchema = defineMongooseModel({
    name: 'Usuario',

    schema: {
        name: { type: 'string', required: true, maxlength: 30, trim: true, unique: true },
        fullname: { type: 'string', required: true, maxlength: 64, trim: true },
        email: { type: 'string', required:true, trim: true, unique: true },
        password: {type: 'string', required: true, maxlength: 64, select: false },
        operation: {
            create: { type: 'boolean', default: false },
            read: { type: 'boolean', default: true },
            update: { type: 'boolean', default: false },
            delete: { type: 'boolean', default: false },
        },
        admin: { type: 'boolean', default: false },
        active: { type: 'boolean', default: true },
        videos: [{type: Types.ObjectId, ref: 'Video'}],
        conjuntos: [{type: Types.ObjectId, ref: 'Conjunto'}],
        bookmarks: [{type: Types.ObjectId, ref: 'Video'}],
        drafts: [{type: Types.ObjectId, ref: 'Video'}],
        draftsConjuntos: [{type: Types.ObjectId, ref: 'Conjunto'}],
        review: [{type: Types.ObjectId, ref: 'Conjunto'}],
        profileImage: { type: 'string', default: null },
        recover: {
            _id: { type: 'string', },
            expire: { type: 'date' }
        },
    },

    // Opciones adicionales del modelo
    options: {
        // Habilita propiedades 'createdAt' (fecha de creación) y 'updatedAt' (fecha de última modificación)
        timestamps: true,
        // Nombre en la base de datos (por convención se pluraliza)
        collection: 'usuarios'
    },

    // Verificaciones (middleware) y funciones aplicables a schema.
    hooks(schema) {
        // Middleware para almacenar contraseña de manera segura (usando bcrypt)
        schema.pre('save', function(next){
            const saltRounds = 10
            this.password = bcrypt.hashSync(this.password, saltRounds)
            if(this.password)
                next()
            throw createError({ statusCode: 500, statusMessage: 'validation failed'})
        }),

        // Middleare para almacenenar contraseña segura en actualizaciones
        // Nota: a diferencia de schema.pre(save), "this" no es el documento, es el query o solicitud de actualización.
        // Detalles en https://mongoosejs.com/docs/middleware.html#notes
        schema.pre('findOneAndUpdate', function(next){
            const updateObject = this.getUpdate() // propiedades que se actualizarán
            if(updateObject?.password){ // encriptar si hay una actualización de la contraseña
                const saltRounds = 10
                const encryptedPassword = bcrypt.hashSync(updateObject.password, saltRounds)
                if(!encryptedPassword)
                    throw createError({statusCode: 500, statusMessage: 'Encryption failed', message: 'Hash encryption error during update password'})
                this.set({ password: encryptedPassword })
            }
            next()
        })

        /**
         * Compara la versión textual de una contraseña y su versión encriptada.
         * @retuns {boolean} True si las contraseñas coinciden, false en otro caso.
         */
        schema.static('passwordMatches', function(plainTextPassword, hash){
            return bcrypt.compareSync(plainTextPassword, hash)
        })
    }
})