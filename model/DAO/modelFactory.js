import ModelFile from "./mascotasFile.js";
import ModelMongoDB from "./mascotasMongoDB.js";

class ModelFactory {
  static get(tipo) {
    switch (tipo) {
      case "FILE":
        console.log("**** Persistiendo en File System ****");
        return new ModelFile();

      case "MONGODB":
        console.log("**** Persistiendo en MongoDB ****");
        return new ModelMongoDB();

      default:
        console.log("**** Persistiendo en FILE (default) ****");
        return new ModelFile();
    }
  }
}

export default ModelFactory;
