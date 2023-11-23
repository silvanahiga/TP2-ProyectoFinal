import Joi from "joi"

export const validar = mascota => {
    const mascotaSchema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        nombreMascota: Joi.string().required(),
        tipoMascota: Joi.string().required(),
        edad: Joi.number().min(0).max(1000000).required(),
        telefono: Joi.string().required(),
        mail: Joi.string().email().required()
    })

    const { error } = mascotaSchema.validate(mascota)
    if (error) {
        return { result: false, error }
    } return { result: true, error }
}

export const validarActualizacion = mascota => {
    const mascotaSchema = Joi.object({
        nombre: Joi.string().alphanum(),
        apellido: Joi.string().alphanum(),
        nombreMascota: Joi.string().alphanum(),
        tipoMascota: Joi.string().alphanum(),
        edad: Joi.number().min(0).max(1000000),
        telefono: Joi.string().alphanum(),
        mail: Joi.string().email()
    })

    const { error } = mascotaSchema.validate(mascota)
    if (error) {
        return { result: false, error }
    } return { result: true, error }
}