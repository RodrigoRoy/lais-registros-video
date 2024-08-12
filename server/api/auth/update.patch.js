import jwt from 'jsonwebtoken'

/**
 * Recibe token y devuelve token actualizado desde la base de datos
 * @param {string} token - JWT con payload del usuario
 */
export default defineEventHandler(async (event) => {
    // Información recibida del request.body
    const { token } = await readBody(event)

    // Verificar que se incluya el token
    if (!token) throw createError({ statusCode: 400, statusMessage: 'Missing token' })
    
    try {
        // Decodificar token
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        if (!tokenData) throw createError({ statusCode: 400, statusMessage: 'Cannot verify token'})
        
        const user = await UsuarioSchema.findById(tokenData._id).select('+password').lean().exec()
        if(!user) throw createError({ statusCode: 500, statusMessage: 'Invalid token'})
    
        // Comprobación deshabilitada para permitir cambio de contraseña en edición de usuario
        // if(tokenData.password !== user.password) throw createError({ statusCode: 400, statusMessage: 'Invalid token'})

        // Convertir la información del usuario en un token JWT
        const updatedToken = jwt.sign(user, process.env.JWT_SECRET)
        if(!updatedToken) throw createError({ statusCode: 500, statusMessage: 'Cannot create token'})
        
        return updatedToken
    } catch (error) {
        throw createError({ statusCode: 400, statusMessage: 'Decoding error', message: error})
    }
})