import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB {

  obtenerHistorial = async (id) => {
    if (id) {
      const mascota = await CnxMongoDB.db.collection('historial').findOne({ _id: new ObjectId(id) })
      console.log("entro id")
      return mascota
    } else {
      const mascotas = await CnxMongoDB.db.collection('historial').find({}).toArray()
      console.log("entro array")
      return mascotas
    }
  }

  guardarHistorial = async (mascota) => {
    if (!CnxMongoDB.connection) return {}
    await CnxMongoDB.db.collection("historial").insertOne(mascota)
    return mascota
  }

  obtenerMascotas = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [] //chequea si no esta conextado
    console.log("entro")

    // if (id) {
    //   const mascota = await CnxMongoDB.db.collection('mascotas').findOne({_id: new ObjectId(id)})
    //   console.log("entro id")
    //   return mascota
    // } else {
    //   const mascotas = await CnxMongoDB.db.collection('mascotas').find({}).toArray()
    //   console.log("entro array")
    //   return mascotas
    // }

    if (id) {
      console.log(id)
      // const mascota = await CnxMongoDB.db.collection('mascotas').findOne({ _id: new ObjectId(id) })
      const mascota = await CnxMongoDB.db.collection("mascotas").aggregate([{ $match: { _id: new ObjectId(id) } },
      // const mascota = await CnxMongoDB.db.collection("mascotas").aggregate([
      {
        $lookup: {
          from: 'historial',
          localField: '_id',
          foreignField: 'mascotaId',
          as: 'visitas'
          // from: 'historial',
          // localField: '_id',
          // foreignField: 'mascotaId',
          // as: 'visitas'
        }
      }]).toArray(function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        db.close();
      });

      return mascota

    } else {
      const mascotas = await CnxMongoDB.db.collection('mascotas').find({}).toArray()
      console.log("array gral")
      return mascotas
    }
  }

  borrarMascota = async (id) => {
    if (!CnxMongoDB.connection) return {}

    const mascotaBorrado = await this.obtenerMascotas(id)

    await CnxMongoDB.db.collection("mascotas").deleteOne(
      { _id: new ObjectId(id) }
    )
    return mascotaBorrado
  }

  actualizarMascota = async (id, mascota) => {
    if (!CnxMongoDB.connection) return {}
    await CnxMongoDB.db.collection("mascotas").updateOne(
      { _id: new ObjectId(id) },
      { $set: mascota }
    )
    const mascotaActualizado = await this.obtenerMascotas(id)
    return mascotaActualizado
  }

  guardarMascota = async (mascota) => {
    if (!CnxMongoDB.connection) return {}
    await CnxMongoDB.db.collection("mascotas").insertOne(mascota)
    return mascota
  }

}

export default ModelMongoDB;
