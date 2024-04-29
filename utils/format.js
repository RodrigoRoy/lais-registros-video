/**
 * Renombra campos los campos definidos en los modelos/esquemas de la base de datos
 * a sus versiones en español.
 * Ejemplos:
 * "codigoReferencia" => "Código de referencia"
 * "entrevista" => "Entevista"
 * "contenidoEstructura" => "Contenido y estructura"
 * null => ''
 * @param {string} fieldName Nombre del campo
 * @returns {string} Versión textual al español del nombre del campo
 */
export default function (fieldName){
    if(!fieldName)
        return ''

    // Diccionario que contiene todas los términos y su versión al español
    const dictionary = {
        // UNIDAD DOCUMENTAL
            // Área de identificación
        identificacion: 'Identificación',
        codigoReferencia: 'Código de referencia',
        fecha: 'Fecha',
        lugar: 'Lugar',
        pais: 'País',
        duracion: 'Duración',
        personasEntrevistadas: 'Personas entrevistadas',
        entrevista: 'Entrevista',
        camara: 'Cámara',
        iluminacion: 'Iluminación',
        asistencia: 'Asistencia',
        sonido: 'Sonido',
            // Área de contenido y estructura
        contenidoEstructura: 'Contenido y estructura',
        descripcionGeneral: 'Descripción general',
        estructuraFormal: 'Estructura formal',
        descriptorOnomastico: 'Descriptor onomástico',
        descriptorToponimico: 'Descriptor toponímico',
            // Área de condiciones de acceso y uso
        condicionesAccesoUso: 'Condiciones de acceso y uso',
        idiomaOriginal: 'Idioma original',
        soporte: 'Soporte',
        numeroCasetes: 'Número de casetes',
        color: 'Color',
        audio: 'Audio',
        sistemaGrabacion: 'Sistema de grabación',
        resolucionGrabacion: 'Resolución de grabación',
        formatoVideoDigital: 'Formato de video digital',
        requisitosTecnicos: 'Requisitos técnicos',
            // Área de documentación asociada
        documentacionAsociada: 'Documentación asociada',
        unidadesDescripcionRelacionadas: 'Unidades de descripción relacionadas',
        documentosAsociados: 'Documentos asociados',
            // Área de notas
        notas: 'Notas',
            // Área de control de la descripción
        controlDescripcion: 'Control de la descripción',
        documentalista: 'Documentalista',
            // Información adicional
        adicional: 'Adicional',
        imagen: 'Imagen',
        clipVideo: 'Clip de video',
        documentoCalificacion: 'Documento de calificación',
        isPublic: 'Visibilidad',
        location: 'Ubicación',
    }

    // Si no existe la traducción deseada, devolver cadena vacía
    if(!Object.hasOwn(dictionary, fieldName))
        return ''

    return dictionary[fieldName]
}