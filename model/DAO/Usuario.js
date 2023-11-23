import bcrypt from "bcryptjs";
import CnxMongoDB from "../DBMongo.js";

class Usuario {

  static async getUsuarioPorEmail(email) {
    try {
      if (!CnxMongoDB.connection) return {}
      const usuario = await CnxMongoDB.db.collection("users").findOne({ email: email });

      return usuario;
    } catch (error) {
      console.error("Error getting user by email:", error.message);
      throw error;
    }
  }

  static async compararPassword(email, password) {
    try {
      if (!CnxMongoDB.connection) return {}

      const usuario = await CnxMongoDB.db.collection("users").findOne({ email: email });

      if (!usuario) {
        return false;
      }

      const isValidPassword = await bcrypt.compare(password, usuario.password);

      return isValidPassword;
    } catch (error) {
      console.error("Error comparing password:", error.message);
      throw error;
    }
  }
}

export default Usuario;
