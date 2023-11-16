import config from "../config.js";
import ModelFactory from "../model/DAO/modelFactory.js";

class ServicioHistorial {
  constructor() {
    this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
  }

  obtenerHistorial = async (id) => {
    const mascotas = await this.model.obtenerHistorial(id);
    return mascotas
  };

  //   actualizarMascota = (id, mascota) => {
  //     return this.model.actualizarMascota(id, mascota)
  //   }

  //   borrarMascota = (id) => {
  //     return this.model.borrarMascota(id)
  //   }

  guardarHistorial = async (mascota) => {
    const mascotaGuardado = await this.model.guardarHistorial(mascota);
    return mascotaGuardado;
  };

}

export default ServicioHistorial;
