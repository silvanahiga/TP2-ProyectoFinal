import { faker } from '@faker-js/faker/locale/es';


const get = () => ({
    nombre: faker.person.firstName(),
    apellido: faker.person.lastName(),
    nombreMascota: faker.person.firstName(),
    tipoMascota: faker.animal.cat(),
    edad: faker.number.int({ min: 1, max: 15 }),
    telefono: faker.phone.number(),
    mail: faker.internet.email(),
})

console.log(get())

//este test se corre con: node ./test/generador/mascota.js

export default {
    get
}