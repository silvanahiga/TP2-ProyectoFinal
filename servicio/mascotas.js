import ModelFactory from "../model/DAO/modelFactory.js";
import nodemailer from "nodemailer";
import { validar, validarActualizacion } from "./validaciones/mascotas.js";
import axios from "axios";

class ServicioMascotas {
  constructor(persistencia) {
    this.model = ModelFactory.get(persistencia);
  }

  obtenerMascotas = async (id) => {
    const mascotas = await this.model.obtenerMascotas(id);
    return mascotas;
  };

  actualizarMascota = (id, mascota) => {
    const res = validarActualizacion(mascota);
    if (res.result) {
      return this.model.actualizarMascota(id, mascota);
    } else {
      console.log(res.error);
      throw res.error;
    }
  };

  borrarMascota = (id) => {
    return this.model.borrarMascota(id);
  };

  guardarMascota = async (mascota) => {
    const res = validar(mascota);
    if (res.result) {
      const mascotaGuardado = await this.model.guardarMascota(mascota);
      return mascotaGuardado;
    } else {
      console.log(res.error);
      throw res.error;
    }
  };

  // const producto = async () => {
  //   let resultado
  //   try {
  //     console.log("---------------------------------esta es el producto")
  //     resultado = await axios.get('https://fakestoreapi.com/products')
  //     var productoKey = Math.floor(Math.random() * resultado.data.length);
  //     console.log(resultado.data[productoKey]);
  //   }
  //   catch (error) {
  //     console.log(error.message)
  //   }

  //   // console.log(resultado.data)
  // }
  enviarMail = async (req, res) => {
    const array = await this.obtenerMascotas();

    var transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "melvin.conroy64@ethereal.email",
        pass: "HfFn13uUN3jpPTybD7",
      },
    });

    for (let i = 0; i < array.length; i++) {
      if (array[i].visitas.length >= 2) {
        let mailOptions = {
          from: "Remitente",
          to: array[i].mail,
          subject: "Promo vete!",
          text: "Promo veterinaria",
          html: `<h1>Promo veterinaria</h1>
          <h2>con por la visita de hoy obtenes un descuento de 10% en alimentos balanceados!</h2>
        `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error envio correo: " + error.message);
          } else {
            console.log("Email enviado correctamente");
            console.log(info);
            res.status(200).jsonp(req.body);
          }
        });
      }
    }
  };

  obtenerOfertas = async () => {
    let resultado;
    try {
      console.log("---------------------------------esta es el producto");
      resultado = await axios.get("https://fakestoreapi.com/products")
      var item =await  resultado.data[Math.floor(Math.random()*resultado.data.length)];
      console.log(item)
      return (item)
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default ServicioMascotas;
