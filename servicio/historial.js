import ModelFactory from "../model/DAO/modelFactory.js";
import { validar, validarActualizacion } from "./validaciones/historial.js";

class ServicioHistorial {
  constructor(persistencia) {
    this.model = ModelFactory.get(persistencia);
  }

  obtenerHistorial = async (id) => {
    const historial = await this.model.obtenerHistorial(id);
    return historial;
  };

  actualizarHistorial = (id, historial) => {
    const res = validarActualizacion(historial);
    if (res.result) {
      return this.model.actualizarHistorial(id, historial);
    } else {
      console.log(res.error);
      throw res.error;
    }
  };

  borrarHistorial = (id) => {
    return this.model.borrarHistorial(id);
  };

  guardarHistorial = async (historial) => {
    const res = validar(historial);
    if (res.result) {
      const historialGuardado = await this.model.guardarHistorial(historial);

      return historialGuardado;
    } else {
      console.log(res.error);
      throw res.error;
    }
  };
}

export default ServicioHistorial;
