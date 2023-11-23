
import { expect } from "chai"
import generador from "./generador/mascota.js"
// nombre: faker.person.firstName(),
// apellido: faker.person.lastName(),
// nombreMascota: faker.person.firstName(),
// tipoMascota: faker.animal.cat(),
// edad: faker.number.int({ min: 1, max: 15 }),
// telefono: faker.phone.number(),
// mail: faker.internet.email(),

describe("******Test del generador de mascotas*******", () => {
    it("la mascota debe contener los campos nombre, apellido, nombreMascota, tipoMascota, edad, telefono, mail", () => {
        const mascota = generador.get()
        console.log(mascota)
        expect(mascota).to.include.keys("nombre", "apellido", "nombreMascota", "tipoMascota", "edad", "telefono", "mail")
    })

    it("deberia generar productos aleatorios", () => {
        const mascota1 = generador.get()
        const mascota2 = generador.get()

        console.log(mascota1)
        console.log(mascota2)
        expect(mascota1.nombre).not.to.eql(mascota2.nombre)
        expect(mascota1.apellido).not.to.eql(mascota2.apellido)
        expect(mascota1.nombreMascota).not.to.eql(mascota2.nombreMascota)
    })
})