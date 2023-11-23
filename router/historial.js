import express from "express";
import ControladorHistoria from "../controlador/historial.js";
import { isAuthenticated } from "../passport/local-auth.js";

class RouterHistoria {
  constructor(persistencia) {
    this.router = express.Router();
    this.controlador = new ControladorHistoria(persistencia);
  }

  start() {
    // this.router.get("/:id?",isAuthenticated,this.controlador.obtenerHistorial);
    this.router.get("/:id?",this.controlador.obtenerHistorial);
    // this.router.post("/", isAuthenticated, this.controlador.guardarHistorial);
    this.router.post("/",this.controlador.guardarHistorial);

    return this.router;
  }
}

export default RouterHistoria;
