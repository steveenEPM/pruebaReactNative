export interface interfaceBooks {
    libro: string
    autor: string
    año: string,
    genero: string
    descripcion: string
}

export interface interfaceAllBooks {
    id: string
    data: interfaceBooks
}