import axios, { AxiosRequestConfig } from "axios"
import { interfaceAllBooks, interfaceBooks } from "../interface/interface"

class Server {

    HOST: string = "http://192.168.100.200:3030"

    constructor() { }

    nuevoLibro = (element: interfaceBooks): Promise<{ resConfirm: any } | string> => {

        let { libro, autor, año, genero, descripcion } = element

        let api: AxiosRequestConfig = {
            baseURL: this.HOST, url: "/books", method: "post",
            data: {
                libro, autor, año, genero, descripcion
            }
        }

        return new Promise(async (resolve, rejects) => {
            try {
                let { confirm } = await axios(api).then(e => {
                    let { confirm } = e.data
                    return { confirm }
                })
                resolve({
                    resConfirm: confirm
                })
            } catch (error) {
                rejects(error)
            }
        })
    }


    allLibros = (): Promise<{ resLibro: any } | string> => {

        let api: AxiosRequestConfig = {
            baseURL: this.HOST, url: "/books", method: "get"
        }

        return new Promise(async (resolve, rejects) => {
            try {
                let { libros } = await axios(api).then(e => {
                    let { libros } = e.data
                    return { libros }
                }) 

                resolve({ resLibro: libros })
            } catch (error) {
                rejects(error)
            }
        })
    }

    detalleLibro = (id: string): Promise<{ resBook: any } | string> => {


        let api: AxiosRequestConfig = {
            baseURL: this.HOST, url: `/books/${id}`, method: "get"
        }


        return new Promise(async (resolve, reject) => {

            try {

                let { libro } = await axios(api).then(e => {
                    let { libro } = e.data
                    return { libro }
                })

                resolve({ resBook: libro })

            } catch (error) {
                reject(error)
            }

        })
    }


    eliminarLibro = (id: string): Promise<string> => {


        let api: AxiosRequestConfig = {
            baseURL: this.HOST, url: `/books/${id}`, method: "delete"
        }


        return new Promise(async (resolve, reject) => {

            try {

                let process = await axios(api).then(e => {
                    return e.data
                })

                resolve(process)

            } catch (error) {
                reject(error)
            }

        })
    }


    modificarLibro = (id: string, element: interfaceBooks): Promise<string> => {


        let { libro, autor, año, genero, descripcion } = element

        let api: AxiosRequestConfig = {
            baseURL: this.HOST, url: `/books/${id}`, method: "put",
            data: {
                libro, autor, año, genero, descripcion
            }
        }



        return new Promise(async (resolve, reject) => {

            try {

                let process = await axios(api).then(e => {
                    return e.data
                })

                resolve(process)

            } catch (error) {
                reject(error)
            }

        })
    }
}


export const ApiBook = new Server()