import express from "express";
import ControladorMascotas from "../controlador/mascotas.js";
import { isAuthenticated } from "../passport/local-auth.js";

class RouterMascotas {
  constructor(persistencia) {
    this.router = express.Router();
    this.controlador = new ControladorMascotas(persistencia);
  }

  start() {
    this.router.get("/ofertas", isAuthenticated, this.controlador.obtenerOfertas
    );
    this.router.get("/guardarmascota", isAuthenticated, this.controlador.formularioMascota);
    // this.router.get("/:id?", isAuthenticated, this.controlador.obtenerMascotas);
    this.router.get("/:id?", this.controlador.obtenerMascotas);
    this.router.put("/:id", isAuthenticated, this.controlador.actualizarMascota);
    this.router.delete("/:id", isAuthenticated, this.controlador.borrarMascota);
    // this.router.post("/", isAuthenticated, this.controlador.guardarMascota);
    this.router.post("/", this.controlador.guardarMascota);
    //mail
    // this.router.post("/send-email",isAuthenticated,this.controlador.enviarMail);
    this.router.post("/send-email", this.controlador.enviarMail);
    return this.router;
  }
}

export default RouterMascotas;
