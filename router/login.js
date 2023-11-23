import express from "express";
import passport from "passport";
import { isAuthenticated } from "../passport/local-auth.js";

class RouterLogin {
  constructor(persistencia) {
    this.router = express.Router();
    // this.controlador = new ControladorLogin(persistencia);
  }

  start() {
    this.router.get("/", (req, res, next) => {
      res.render("index");
    });

    this.router.get("/signup", (req, res, next) => {
      res.render("signup");
    });

    this.router.post(
      "/signup",
      passport.authenticate("local-signup", {
        successRedirect: "/mascotas/guardarmascota",
        failureRedirect: "/signup",
        failureFlash: true,
      })
    );

    this.router.get("/signin", (req, res, next) => {
      res.render("signin");
    });

    this.router.post(
      "/signin",
      passport.authenticate("local-signin", {
        successRedirect: "/mascotas/guardarmascota",
        failureRedirect: "/signin",
        failureFlash: true,
      })
    );

    this.router.get("/profile", isAuthenticated, (req, res, next) => {
      res.render("profile");
    });

    this.router.get("/logout", (req, res, next) => {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    });

    return this.router;
  }
}

export default RouterLogin;
