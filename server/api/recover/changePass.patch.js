import bcrypt from 'bcrypt'

/**
 * Cambia la contraseña de un usuario.
 * Para realizar el cambio se debe integrar la contraseña actual
 * @param {String} body.id Id del usuario
 * @param {String} body.password Contraseña actual
 * @param {String} body.newPassword Nueva contraseña
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body || !body.id || !body.password || !body.newPassword) 
        throw createError({ statusCode: 400, statusMessage: 'Empty body', message: "User info and password not provided"})
    
    // Actualizar información en base de datos
    try {
        const user = await UsuarioSchema.findById(body.id).select('+password').lean().exec()

        // Verificar que la contraseña coincida con su versión encriptada
        const matches = await bcrypt.compare(body.password, user.password)
        if(!matches) 
            throw createError({ statusCode: 400, statusMessage: 'Incorrect password', message: 'The password does not match'})
        
        return await UsuarioSchema.findByIdAndUpdate(user._id, {password: body.newPassword}).exec()
    }
    catch (error) {
        throw createError({ statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message })
    }
})