import express from "express";
import RouterMascotas from "./router/mascotas.js";
import config from "./config.js";
import CnxMongoDB from "./model/DBMongo.js"
import RouterHistorial from "./router/historial.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/mascotas", new RouterMascotas().start());
app.use("/historial", new RouterHistorial().start());

if (config.MODO_PERSISTENCIA == "MONGODB") {  // solo se conecta si el tipo de conexion es mongodb
  await CnxMongoDB.conectar()
}

const PORT = config.PORT;
const server = app.listen(PORT, () =>
  console.log(`Servidor express escuchando en http://localhost:${PORT}`)
);
server.on("error", (error) => console.log(`Error en servidor: ${error.message}`));
