import ServicioHistorial from "../servicio/historial.js";


class ControladorHistorial {
  constructor(persistencia) {
    this.servicio = new ServicioHistorial(persistencia);
  }

  obtenerHistorial = async (req, res) => {
    const { id } = req.params
    const historial = await this.servicio.obtenerHistorial(id);
    res.json(historial);
  };

  actualizarHistorial = async (req, res) => {
    try {
      const { id } = req.params
      const historial = req.body
      const historialActualizado = await this.servicio.actualizarHistorial(id, historial)
      res.json(historialActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  borrarHistorial = async (req, res) => {
    const { id } = req.params
    const historialBorrado = await this.servicio.borrarHistorial(id)
    res.json(historialBorrado)
  }

  guardarHistorial = async (req, res) => {
    try {
      const historial = req.body;
      const historialGuardado = await this.servicio.guardarHistorial(historial);
      res.json(historialGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  };

}

export default ControladorHistorial;