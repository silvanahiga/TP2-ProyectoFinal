import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"


class ModelMongoDB {

  obtenerHistorial = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [] //chequea si no esta conextado
    if (id) {
      //devuelve un array con todas las visitas realizadas segun id de mascota
      const historial = await CnxMongoDB.db.collection('historial').find({ mascotaId: new ObjectId(id) }).toArray()
      return historial
    } else {
      const historialCompleto = await CnxMongoDB.db.collection('historial').find({}).toArray()
      return historialCompleto
    }
  }

  guardarHistorial = async (historial) => {
    try {
      if (!CnxMongoDB.connection) return {}
      await CnxMongoDB.db.collection("historial").insertOne({ mascotaId: new ObjectId(historial.mascotaId), comentario: historial.comentario })
      return historial
    } catch (error) {
      console.log(error.message)
    }

  }

  obtenerMascotas = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [] //chequea si no esta conectado
    if (id) {
      const mascota = await CnxMongoDB.db.collection("mascotas").aggregate([{ $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'historial',
          localField: '_id',
          foreignField: 'mascotaId',
          as: 'visitas'
        }
      }]).toArray(function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
      });
      console.log(mascota)
      return mascota

    } else {
      const mascotas = await CnxMongoDB.db.collection("mascotas").aggregate([
        {
          $lookup:
          {
            from: 'historial',
            localField: '_id',
            foreignField: 'mascotaId',
            as: 'visitas'
          }
        }
      ]).toArray(function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
      });
      return mascotas
    }
  }

  borrarMascota = async (id) => {
    try {
      if (!CnxMongoDB.connection) return {}

      const mascotaBorrado = await this.obtenerMascotas(id)
      await CnxMongoDB.db.collection("mascotas").deleteOne(
        { _id: new ObjectId(id) }
      )
      return mascotaBorrado
    } catch (error) {
      console.log(error.message)
    }

  }

  actualizarMascota = async (id, mascota) => {
    try {
      if (!CnxMongoDB.connection) return {}
      await CnxMongoDB.db.collection("mascotas").updateOne(
        { _id: new ObjectId(id) },
        { $set: mascota }
      )
      const mascotaActualizado = await this.obtenerMascotas(id)
      return mascotaActualizado
    } catch (error) {
      console.log(error.message)
    }

  }

  guardarMascota = async (mascota) => {
    try {
      if (!CnxMongoDB.connection) return {}
      await CnxMongoDB.db.collection("mascotas").insertOne(mascota)
      return mascota

    } catch (error) {
      console.log(error.message)
    }

  }



}

export default ModelMongoDB;
