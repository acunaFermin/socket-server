import { Socket } from "dgram";


export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectadoo')
    })
}

export const mensaje = (cliente: Socket, io:Socket) => {

    cliente.on('mensaje', ( payload: { de:string, cuerpo:string } ) => {

        console.log('mensaje recibido', payload)

        io.emit('mensaje-nuevo', payload)

    })
}