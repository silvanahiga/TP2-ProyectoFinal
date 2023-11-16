const PORT = 8080;
const MODO_PERSISTENCIA = "MONGODB"; // Ejemplos 'FILE', 'MONGODB'
const STRCNX = "mongodb://127.0.0.1"  //string de conexion
const BASE = "mibase"

export default {
  PORT,
  MODO_PERSISTENCIA,
  STRCNX,
  BASE
};





// db.mascotas.aggregate(
//   [
//     {
//       $match:{
//        _id: ObjectId("65515b547669703c6b3d0308")
       
//       }
//     },
//     {
//       $lookup:{
//         from:'historial',
//         localField:'_id',
//         foreignField: 'mascotaId',
//         as: 'visitas'
//       }
//     }
//   ]
// ).pretty()


// db.mascotas.aggregate(
//   [
//     {
//       $match:{
//         _id: ObjectId("65515b067669703c6b3d0307"),
//       }
//     }
//   ] 
//   ).pretty()