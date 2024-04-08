import jwt from 'jsonwebtoken'

/**
 * Recibe token y devuelve la información del usuario
 * @param {strin} token - JWT con payload del usuario
 */
export default defineEventHandler(async (event) => {
    // Información recibida del request.body
    const { token } = await readBody(event)

    // Verificar que se incluya el token
    if (!token) throw createError({ statusCode: 400, statusMessage: 'Missing token' })
    
    try {
        // Decodificar token
        const user = jwt.verify(token, process.env.JWT_SECRET)
        if (!user) return createError({ statusMessage: 400, statusMessage: 'Cannot verify token'})
        
        return user
    } catch (error) {
        return createError({ statusMessage: 400, statusMessage: error})
    }    
})