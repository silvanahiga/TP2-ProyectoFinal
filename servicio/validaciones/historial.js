import Joi from "joi"
// "_id": "65542b9f06ee045f9ca13b47",
// "mascotaId": "65515b067669703c6b3d0307",
// "comentario": "presenta patas traseras lastimadas"

export const validar = historial => {

    const historialSchema = Joi.object({
        mascotaId: Joi.string().required(), 
        comentario: Joi.string().required(),
                                         
    })
                 
    const { error } = historialSchema.validate(historial)
    if (error) {
        return { result: false, error }
    } return { result: true, error }
}

export const validarActualizacion = historial => {

    const historialSchema = Joi.object({
        mascotaId: Joi.string().alphanum(),
        comentario: Joi.string().alphanum(),
    })

    const { error } = historialSchema.validate(historial)
    if (error) {
        return { result: false, error }
    } return { result: true, error }
}