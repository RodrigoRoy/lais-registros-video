/**
 * Parser para mostrar la duración en formato "<horas> h <minutos> min"
 * Ejemplos: 
 * 76 => '1 h 16 min'
 * 26 => '26 min'
 * 120 => '2 h'
 * null => ''
 * @param {number} minutes La duración expresada en minutos totales
 * @returns {string} La duración expresada como texto en horas y minutos
 */
export default function (minutes){
    if(!minutes || !Number.isInteger(minutes))
        return ''
    
    // Number values
    const hours = Math.floor(minutes/60)
    const remainingMinutes = minutes % 60

    // Text values
    const hoursText = hours > 0 ? `${hours} h` : ''
    const remainingMinutesText = remainingMinutes !== 0 ? `${remainingMinutes} min` : ''
    
    return `${hoursText} ${remainingMinutesText}`.trim()
}