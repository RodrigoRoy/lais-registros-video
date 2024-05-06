import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * Recibe información del usuario y devuelve sus datos
 * en formato de JSON Web Token (JWT)
 * @param {string} name - Nombre de usuario o email
 * @param {string} password - Contraseña (en texto plano)
 */
export default defineEventHandler(async (event) => {
    // Información recibida del request.body
    const { name, password } = await readBody(event)

    // Verificar que se incluya nombre y contraseña
    if (!name || !password) throw createError({ statusCode: 400, statusMessage: 'Username and password required' })

    try {
        // Buscar usuario por correo o por nombre de usuario
        const user = await UsuarioSchema.findOne({ $or: [ {email: name}, {name: name}] }).select('+password').lean().exec()
        if(!user) throw createError({ statusCode: 400, statusMessage: 'Wrong Username or password'})

        // Verificar que la contraseña coincida con su versión encriptada
        const matches = await bcrypt.compare(password, user.password)
        if(!matches) throw createError({ statusCode: 400, statusMessage: 'Wrong Username or password'})

        // Convertir la información del usuario en un token JWT
        const token = jwt.sign(user, process.env.JWT_SECRET)
        if(!token) throw createError({ statusCode: 500, statusMessage: 'Cannot create token'})
        
        return token
    } catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'DB error', message: error})
    }
})