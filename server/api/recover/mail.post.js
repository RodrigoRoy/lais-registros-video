/**
 * Envia correo de recuperación al usuario
 * @param {string} body.username Nombre de usuario
 * @param {string} body.url URL de recuperación de contraseña
 * @param {string} body.email Correo electrónico del usuario
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { sendMail } = useNodeMailer()

    // Verificar que el contenido no sea vacio
    if (!body || !body.username || !body.url || !body.email) throw createError({ statusCode: 400, statusMessage: 'Empty body' })
    
    // Gmail needs app password: https://myaccount.google.com/apppasswords
    return sendMail({
        subject: 'Sistema de registros en video del LAIS',
        text: `Hola, ${body.username}. Para recuperar tu cuenta y generar una nueva contraseña, por favor copia y pega el siguiente enlace en un navegador web: ${body.url}. Si no solicitaste la recuperación de tu cuenta, ignora este correo.`,
        html: `<p>Hola, ${body.username}.</p><p>Para recuperar tu cuenta y generar tu nueva contraseña, por favor sigue el siguiente enlace:<br><a href="${body.url}">${body.url}</a></p><p>Si no solicitaste la recuperación de tu cuenta, ignora este correo.</p>`,
        to: body.email
    })
})