/**
 * Actualiza la contraseña de un usuario.
 * Para realizar el cambio, se valida la información en "recovery"
 * @param {String} body.user Id del usuario
 * @param {String} body.id Id de recuperación del usuario
 * @param {String} body.password Nueva contraseña del usuario
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body', message: "Not user and validation code provided"})
        
    const userId = body.user
    const recoverId = body.id
    const rawPassword = body.password
    
    // Actualizar información en base de datos
    try {
        const user = await UsuarioSchema.findById(userId)
        
        if(!user) throw createError({ statusCode: 400, statusMessage: 'Bad request', message: 'Invalid user Id'})
        
        if(user.recover?.expire && new Date().getTime() > user.recover.expire.getTime())
            throw createError({ statusCode: 400, statusMessage: 'Bad request', message: 'Expired date for password recovery'})

        // TODO: Encriptar correo antes de llamada a BD?
        return await UsuarioSchema.findByIdAndUpdate( userId, { password: rawPassword, recover: null }, { new: true } )
    }
    catch (error) {
        throw createError({ statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message })
    }
})