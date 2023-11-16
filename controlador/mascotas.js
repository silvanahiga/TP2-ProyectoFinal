import ServicioMascotas from "../servicio/mascotas.js";


class ControladorMascotas {
  constructor() {
    this.servicio = new ServicioMascotas();
  }

  obtenerMascotas = async (req, res) => {
    const { id } = req.params
    const mascotas = await this.servicio.obtenerMascotas(id);
    res.json(mascotas);
  };

  actualizarMascota = async (req, res) => {
    const { id } = req.params
    const mascota = req.body
    const mascotaActualizado = await this.servicio.actualizarMascota(id, mascota)
    res.json(mascotaActualizado)
  }

  borrarMascota = async (req, res) => {
    const { id } = req.params
    const mascotaBorrado = await this.servicio.borrarMascota(id)
    res.json(mascotaBorrado)
  }

  guardarMascota = async (req, res) => {
    const mascota = req.body;
    const mascotaGuardado = await this.servicio.guardarMascota(mascota);
    res.json(mascotaGuardado);
  };
}

export default ControladorMascotas;
