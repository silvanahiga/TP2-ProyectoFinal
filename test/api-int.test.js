import { expect } from "chai"
import supertest from "supertest"
import generador from "./generador/mascota.js"
import Server from "../server.js"



describe("test apirestful", () => {

    describe("GET", () => {
        it("deberia retornar un status 200 ", async () => {
            const server = new Server(8081, "FILE")  //se guarda en file system
            const app = await server.start()

            const request = supertest(app)

            const response = await request.get("/mascotas")
            expect(response.status).to.eql(200)

            server.stop()
        })
    })

    describe("POST", () => {
        it("deberia incorporar una mascota", async () => {
            const server = new Server(8081, "FILE")  //genero un servidor  //se guarda en file system
            const app = await server.start()

            const request = supertest(app)

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

            server.stop()
        })
    })
})