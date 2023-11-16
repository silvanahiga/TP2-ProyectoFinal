import ServicioHistorial from "../servicio/historial.js";


class ControladorHistorial {
  constructor() {
    this.servicio = new ServicioHistorial();
  }

  obtenerHistorial = async (req, res) => {
    const { id } = req.params
    const mascotas = await this.servicio.obtenerHistorial(id);
    res.json(mascotas);
  };

//   actualizarMascota = async (req, res) => {
//     const { id } = req.params
//     const mascota = req.body
//     const mascotaActualizado = await this.servicio.actualizarMascota(id, mascota)
//     res.json(mascotaActualizado)
//   }

//   borrarMascota = async (req, res) => {
//     const { id } = req.params
//     const mascotaBorrado = await this.servicio.borrarMascota(id)
//     res.json(mascotaBorrado)
//   }

  guardarHistorial = async (req, res) => {
    const mascota = req.body;
    const mascotaGuardado = await this.servicio.guardarHistorial(mascota);
    res.json(mascotaGuardado);
  };
  
}

export default ControladorHistorial;