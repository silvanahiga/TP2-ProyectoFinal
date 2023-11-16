import config from "../config.js";
import ModelFactory from "../model/DAO/modelFactory.js";

class ServicioMascotas {
  constructor() {
    this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
  }

  obtenerMascotas = async (id) => {
    const mascotas = await this.model.obtenerMascotas(id);
    return mascotas
  };

  actualizarMascota = (id, mascota) => {
    return this.model.actualizarMascota(id, mascota)
  }

  borrarMascota = (id) => {
    return this.model.borrarMascota(id)
  }

  guardarMascota = async (mascota) => {
    const mascotaGuardado = await this.model.guardarMascota(mascota);
    return mascotaGuardado;
  };

}

export default ServicioMascotas;
