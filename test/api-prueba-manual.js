import axios from "axios";
import supertest from "supertest";


const pruebaServidorConAxios = async () => {
    const url = "http://localhost:8080/mascotas/6559848c0069f1348a0a4c6c"
    try {
        const { data: body, status } = await axios(url)
        console.log("status code", status)
        console.log("body", body)
    } catch (error) {
        console.log("error", error.message)
    }
}

const pruebaServidorConSupertest = async () => {
    const url = "http://localhost:8080/mascotas"
    try {
        const request = supertest(url)

        const { body, status } = await request.get("/6559848c0069f1348a0a4c6c")
        console.log("status code", status)
        console.log("body", body)
    } catch (error) {
        console.log("error", error.message)
    }
}

// pruebaServidorConAxios()
pruebaServidorConSupertest()