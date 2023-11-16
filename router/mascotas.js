import express from "express";
import ControladorMascotas from "../controlador/mascotas.js";

class RouterMascotas{
  constructor() {
    this.router = express.Router();
    this.controlador = new ControladorMascotas();
  }

  start() {
    // this.router.get("/", this.controlador.obtenerMascotas);
    // /libros:id GET (Obtiene un libro por su id)
    this.router.get("/:id?", this.controlador.obtenerMascotas)
    // libros:id PUT (Actualiza un libro por su id)
    this.router.put("/:id", this.controlador.actualizarMascota)
    // /libros:id DELETE (Borra un libro por su id)
    this.router.delete("/:id", this.controlador.borrarMascota)
    this.router.post("/", this.controlador.guardarMascota);

    return this.router;
  }
}

export default RouterMascotas;
