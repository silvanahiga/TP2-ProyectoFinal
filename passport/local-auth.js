import { ObjectId } from "mongodb";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Usuario from "../model/DAO/Usuario.js";
import bcrypt from "bcryptjs";
import CnxMongoDB from "../model/DBMongo.js";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await CnxMongoDB.db.collection("users").findOne({ _id: new ObjectId(id) });
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const usuarioExistente = await Usuario.getUsuarioPorEmail(email);

        if (usuarioExistente) {
          const mensajeError = "El email ingresado ya ha sido registrado.";
          console.error(mensajeError);
          return done(null, false, req.flash("signupMessage", mensajeError));
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const nuevoUsuario = {
            email: email,
            password: hashedPassword,
          };
          await CnxMongoDB.db.collection("users").insertOne(nuevoUsuario);
          console.log("Usuario registrado con éxito");
          done(null, nuevoUsuario);
        }
      } catch (error) {
        console.error("Error durante el signup:", error.message);
        done(error, null);
      }
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const usuario = await Usuario.getUsuarioPorEmail(email);

        if (!usuario) {
          const mensajeError = "Usuario incorrecto/inexistente";
          //// alternativa 1 para manejo de error:
          console.error(mensajeError);
          return done(null, false, req.flash("signinMessage", mensajeError));
          //// alternativa 2 para majeo de error (dentro del done() primer parametro)
          // return done(console.log(mensajeError), false, req.flash("signinMessage", mensajeError));
        }

        const isValidPassword = await Usuario.compararPassword(email, password);

        if (!isValidPassword) {
          const mensajeError = "Password incorrecta";
          console.error(mensajeError);
          return done(null, false, req.flash("signinMessage", mensajeError));
        }
        console.log("Usuario logueado con éxito");
        return done(null, usuario);
      } catch (error) {
        console.error("Error durante el signin:", error.message);
        done(error, null);
      }
    }
  )
);

export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
