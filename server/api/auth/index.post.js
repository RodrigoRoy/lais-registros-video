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
    if (!name || !password) throw createError({ statusCode: 400, statusMessage: 'Required field' })
    
    // Verificar si el nombre de usuario es un email
    const isEmail = /^.+@.+(\..+)+$/gm.test(name)

    let user = null
    if(isEmail){
        // Verificar que exista el usuario (buscando por email)
        user = await UsuarioSchema.findOne({email: name}).select('+password +email').lean().exec()
        if(!user) throw createError({ statusMessage: 'Username or password is wrong.'})
    }
    else{
        // Verificar que exista el usuario (buscando por name)
        user = await UsuarioSchema.findOne({name: name}).select('+password +email').lean().exec()
        if(!user) throw createError({ statusMessage: 'Username or password is wrong.'})
    }

    // Verificar que la contraseña coincida con su versión encriptada
    const matches = await bcrypt.compare(password, user.password)
    if(!matches) throw createError({ statusMessage: 'Username or password is wrong.'})

    // Convertir la información del usuario en un token JWT
    const token = jwt.sign(user, process.env.JWT_SECRET)
    if(!token) throw createError({ statusMessage: 'Cannot create token.'})
    
    return token
})