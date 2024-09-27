/**
 * Obtener URL para recuperación de contraseña de un usuario
 */
export default defineEventHandler(async (event) => {
    const userId = event.context.params?._id
    const origin = event.node?.req?.headers?.host || 'localhost:3000'

    try{
        const user = await UsuarioSchema.findById(userId).lean()
    
        if(!user)
            throw createError({ statusCode: 400, statusMessage: 'Bad request', message: 'Invalid user Id'})

        if(!user.recover?._id)
            return

        // Validar tiempo de expiración
        if(new Date().getTime() > user.recover.expire.getTime())
            throw createError({ statusCode: 400, statusMessage: 'Bad request', message: 'Expired date for password recovery'})
        
        return {
            url: `${origin}/recover?u=${userId}&id=${user.recover._id}`,
            username: user.fullname,
            email: user.email,
            host: origin,
            path: `/recover`,
            query: {
                u: userId,
                id: user.recover._id
            }
        }
    }
    catch (error) {
        throw createError({ statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
})