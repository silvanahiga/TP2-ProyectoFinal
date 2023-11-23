import express from "express";
import RouterMascotas from "./router/mascotas.js";
import RouterHistorial from "./router/historial.js";
import RouterLogin from "./router/login.js";
import CnxMongoDB from "./model/DBMongo.js";
import path from "path";
import engine from "ejs-mate";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from "url";
import "./passport/local-auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
  constructor(port, persistencia) {
    this.port = port;
    this.persistencia = persistencia;
    this.app = express();

    this.server = null;
  }

  async start() {
    this.app.use(express.json());
    this.app.set("views", path.join(__dirname, "/views"));
    this.app.engine("ejs", engine);
    this.app.set("view engine", "ejs");
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: "mysecretsession",
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(flash());
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    //custom middleware p/chequear autenticacion entre paginas:
    this.app.use((req, res, next) => {
      this.app.locals.signinMessage = req.flash("signinMessage");
      this.app.locals.signupMessage = req.flash("signupMessage");
      this.app.locals.user = req.user;
      // console.log(this.app.locals); //.locals es global para toda la app
      next();
    });

    //api mascotas / historial / login
    this.app.use("/mascotas", new RouterMascotas(this.persistencia).start());
    this.app.use("/historial", new RouterHistorial(this.persistencia).start());
    this.app.use("/", new RouterLogin(this.persistencia).start());

    //escuchando servidor express
    if (this.persistencia == "MONGODB") {
      // solo se conecta si el tipo de conexion es mongodb
      await CnxMongoDB.conectar();
    }
  

    const PORT = this.port;
    this.server = this.app.listen(PORT, () =>
      console.log(`Servidor express escuchando en http://localhost:${PORT}`)
    );
    this.server.on("error", (error) =>
      console.log(`Error en servidor: ${error.message}`)
    );

    return this.app;
  }

  async stop() {
    if (this.server) {
      this.server.close();
      await CnxMongoDB.desconectar();
      this.server = null;
    }
  }
}

export default Server;
