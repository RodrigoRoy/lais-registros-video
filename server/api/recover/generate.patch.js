/**
 * Generar petición de recuperación de contraseña.
 * Agrega la propiedad "recovery" a un usuario.
 * @param {String} body.email Correo del usuario
 * @param {String} body.expire Fecha de expiración (usualmente un día después)
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body', message: 'Empty body' })
    
    const userEmail = body.email
    const expireDate = body.expire
    const rngId = Math.floor(Math.random() * 100000000000000).toString() // Id aleatorio de longitud 16

    // Configuración de recuperación de contraseña
    const userRecover = { 
        _id: rngId,
        expire: expireDate,
    }

    try{
        return await UsuarioSchema.findOneAndUpdate( { email: userEmail }, { recover: userRecover}, { new: true, timestamps: false })
    }
    catch (error) {
        throw createError({ statusCode: error.statusCode, statusMessage: error.statusMessage, message: error.message})
    }
})