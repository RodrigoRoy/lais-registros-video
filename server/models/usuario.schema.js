import { defineMongooseModel } from '#nuxt/mongoose'
import bcrypt from 'bcrypt'

export const UsuarioSchema = defineMongooseModel({
    name: 'Usuario',
    schema: {
        name: { type: 'string', required: true, maxlength: 30, trim: true, unique: true },
        fullname: { type: 'string', required: true, maxlength: 64, trim: true },
        email: { type: 'string', required:true, trim: true, unique: true, select: false },
        password: {type: 'string', required: true, maxlength: 64, select: false },
        operation: {
            create: {
                create: { type: 'boolean', default: false },
                read: { type: 'boolean', default: true },
                update: { type: 'boolean', default: false },
                delete: { type: 'boolean', default: false },
                _id: false,
            },
        },
        admin: { type: 'boolean', default: false },
        active: { type: 'boolean', default: true },
    },
    options: {
        timestamps: true,
        collection: 'usuarios'
    },
    hooks(schema) {
        schema.pre('save', function(next){
            // almacenar password de manera segura con bcrypt
            const saltRounds = 10
            this.password = bcrypt.hashSync(this.password, saltRounds)
            next()
        }),
        schema.static('passwordMatches', function(plainTextPassword, hash){
            return bcrypt.compareSync(plainTextPassword, hash)
        })
    }
})