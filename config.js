import dotenv from "dotenv" 

dotenv.config()

const PORT = process.env.PORT || 8080;
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || "MEM"
// const STRCNX = "mongodb://127.0.0.1:27017"  //string de conexion
const STRCNX = process.env.STRCNX  ||  "mongodb://127.0.0.1:27017" 
const BASE =  process.env.BASE || "test"

export default {
  PORT,
  MODO_PERSISTENCIA,
  STRCNX,
  BASE
};




                                     