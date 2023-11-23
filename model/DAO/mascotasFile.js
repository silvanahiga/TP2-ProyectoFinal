import fs from "fs";

class ModelFile {
  constructor() {
    this.nombreArchivo = "mascotas.json";
  }

  leerArchivo = async (nombre) => {
    let mascotas = [];
    try {
      mascotas = JSON.parse(await fs.promises.readFile(nombre, "utf-8"));
    } catch { }
    return mascotas;
  };

  escribirArchivo = async (nombre, mascotas) => {
    await fs.promises.writeFile(nombre, JSON.stringify(mascotas, null, "\t"));
  };

  getNext_id(array) {
    let lg = array.length
    return lg ? parseInt(array[lg - 1].id) + 1 : 1
  }

  obtenerMascotas = async () => {
    try {
      const 
      mascotas = await this.leerArchivo(this.nombreArchivo);
      return mascotas;
    } catch { }
  };

  borrarMascota = async (id) => {
    let mascota = {}
    const mascotas = await this.leerArchivo(this.nombreArchivo)  //leer el archivo
    const index = mascotas.findIndex(c => c.id == id)  //buscar producto por id
    if (index != -1) {
      mascota = mascotas.splice(index, 1)[0] //si se encuentra se borra
      this.escribirArchivo(this.nombreArchivo, mascotas) //para guardar un producto hay que sobreescribir el archivo
    }
    return mascota
  }

  actualizarMascota = async (id, mascota) => {
    mascota.id = id //agregamos el id al producto
    const mascotas = await this.leerArchivo(this.nombreArchivo)  //leer el archivo


    const index = mascotas.findIndex(c => c.id == id)
    if (index != -1) {
      const mascotaAnt = mascotas[index]
      const mascotaNuevo = { ...mascotaAnt, ...mascota }
      mascotas.splice(index, 1, mascotaNuevo)
      this.escribirArchivo(this.nombreArchivo, mascotas) //para guardar un producto hay que sobreescribir el archivo
      return mascotaNuevo

    } else {
      mascotas.push(mascota)
      escribirArchivo(this.nombreArchivo, mascotas) //para guardar un producto hay que sobreescribir el archivo
      return mascota
    }
  }

  guardarMascota = async (mascota) => {
    const mascotas = await this.leerArchivo(this.nombreArchivo);
    let id = this.getNext_id(mascotas)
    mascota.id = id
    mascotas.push(mascota);
    this.escribirArchivo(this.nombreArchivo, mascotas);
    return mascota;
  };
}

export default ModelFile;
