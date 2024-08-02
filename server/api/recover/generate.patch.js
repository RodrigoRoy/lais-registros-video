// import { useDayjs } from '#dayjs'

export default defineEventHandler(async (event) => {
    // const dayjs = useDayjs()
    const body = await readBody(event)

    // Verificar que el contenido no sea vacio
    if (!body) throw createError({ statusCode: 400, statusMessage: 'Empty body' })

    const newRecover = { 
        _id: Math.floor(Math.random() * 100000000000000).toString(),
        expire: new Date()
    }

    try{
        return await UsuarioSchema.findOneAndUpdate( { email: body.email }, { recover: newRecover}, { new: true })
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: 'Error en BD', message: error})
    }
})