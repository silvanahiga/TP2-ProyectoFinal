//////////////////////////////////////////////
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
          return done(
            null,
            false,
            req.flash("signupMessage", "El email ingresado ya ha sido registrado.")
          );
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const nuevoUsuario = {
            email: email,
            password: hashedPassword,
          };
          await CnxMongoDB.db.collection("users").insertOne(nuevoUsuario);
          done(null, nuevoUsuario);
        }
      } catch (error) {
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
          return done(null, false, req.flash("signinMessage", "Usuario incorrecto/inexistente"));
        }

        const isValidPassword = await Usuario.compararPassword(email, password);

        if (!isValidPassword) {
          return done(null, false, req.flash("signinMessage", "Password incorrecta"));
        }

        return done(null, usuario);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export function isAuthenticated(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      console.log("usuario logueado correctamente")
      return next();
    }
    res.redirect("/");
  } catch (error) {
    console.log("error usuario no existe")
    console.log(error.message)
  }

}
