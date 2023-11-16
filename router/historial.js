import express from "express";
import ControladorHistoria from "../controlador/historial.js";

class RouterHistoria{
  constructor() {
    this.router = express.Router();
    this.controlador = new ControladorHistoria();
  }

  start() {
    // this.router.get("/", this.controlador.obtenerMascotas);
    // /libros:id GET (Obtiene un libro por su id)
    this.router.get("/:id?", this.controlador.obtenerHistorial)
    // libros:id PUT (Actualiza un libro por su id)
    // this.router.put("/:id", this.controlador.actualizarMascota)
    // // /libros:id DELETE (Borra un libro por su id)
    // this.router.delete("/:id", this.controlador.borrarMascota)
    this.router.post("/", this.controlador.guardarHistorial);

    return this.router;
  }
}

export default RouterHistoria;