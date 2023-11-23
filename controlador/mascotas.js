import ServicioMascotas from "../servicio/mascotas.js";

class ControladorMascotas {
  constructor(persistencia) {
    this.servicio = new ServicioMascotas(persistencia);
  }

  obtenerMascotas = async (req, res) => {
    const { id } = req.params;
    const mascotas = await this.servicio.obtenerMascotas(id);
    res.json(mascotas);
  };

  actualizarMascota = async (req, res) => {
    try {
      const { id } = req.params;
      const mascota = req.body;
      const mascotaActualizado = await this.servicio.actualizarMascota(
        id,
        mascota
      );
      res.json(mascotaActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  borrarMascota = async (req, res) => {
    const { id } = req.params;
    const mascotaBorrado = await this.servicio.borrarMascota(id);
    res.json(mascotaBorrado);
  };

  guardarMascota = async (req, res) => {
    try {
      const mascota = req.body;
      const mascotaGuardado = await this.servicio.guardarMascota(mascota);
      res.json(mascotaGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  enviarMail = async (req, res) => {
    try {
      const mails = await this.servicio.enviarMail();
      res.json(mails); //devuelve un objeto
    } catch (error) {
      console.log("error enviarMail", error);
    }
  };

  obtenerOfertas = async (req, res) => {
    const ofertas = await this.servicio.obtenerOfertas();
    console.log(ofertas);
    res.json(ofertas);
  };

  formularioMascota = (req, res, next) => {
    try {
      res.render("guardarMascota");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default ControladorMascotas;
