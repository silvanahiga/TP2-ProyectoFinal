import { expect } from "chai"
import supertest from "supertest"
import generador from "./generador/mascota.js"



const request = supertest("http://127.0.0.1:8080")

describe("test apirestful", () => {

    describe("GET", () => {
        it("deberia retornar un status 200 ", async () => {
            const response = await request.get("/mascotas")
            expect(response.status).to.eql(200)
        })
    })

    describe("POST", () => {
        it("deberia incorporar una mascota", async () => {
            const mascota = generador.get()
            console.log("para saber mascota")
            // console.log(mascota)

            const response = await request.post("/mascotas").send(mascota)
            expect(response.status).to.eql(200)

            const mascotaGuardada = response.body
            console.log("para saber mascota guardada")
            // console.log(mascotaGuardada)
            expect(mascotaGuardada).to.include.keys("nombre", "apellido", "nombreMascota", "tipoMascota", "edad", "telefono", "mail")

            expect(mascotaGuardada.nombre).to.eql(mascota.nombre)
            expect(mascotaGuardada.apellido).to.eql(mascota.apellido)
            expect(mascotaGuardada.nombreMascota).to.eql(mascota.nombreMascota)
            expect(mascotaGuardada.tipoMascota).to.eql(mascota.tipoMascota)
            expect(mascotaGuardada.edad).to.eql(mascota.edad)
            expect(mascotaGuardada.telefono).to.eql(mascota.telefono)
            expect(mascotaGuardada.mail).to.eql(mascota.mail)


        })
    })
})