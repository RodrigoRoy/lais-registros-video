export default defineEventHandler(async (event) => {
    const userId = event.context.params?._id
    const hostname = process.env.PUBLICPATH

    try{
        const user = await UsuarioSchema.findById(userId).lean()
    
        // if(!user)
        //     throw createError({ statusCode: 400, statusMessage: 'Bad request', error: 'Invalid user Id'})

        if(!user.recover?._id)
            return
    
        // if(new Date() > user.recover.expire)
        //     throw createError({ statusCode: 400, statusMessage: 'Bad request', error: 'Expired date for recovery'})
        
        return `${hostname}/recover?u=${userId}&id=${user.recover._id}`
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})