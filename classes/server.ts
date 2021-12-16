import   express  from 'express' 
import { SERVER_PORT } from '../global/env';
import  http  from 'http';
import { Socket } from 'dgram';



import * as socket from '../sockets/sockets'

export default class SocketServer {

    private static _instance: SocketServer

    public app: express.Application;
    public port: number;


    public io: Socket;
    private httpServer : http.Server;

    private constructor(){

        this.app = express();

        this.port = SERVER_PORT;

        // this.httpServer = new http.Server( this.app )

        this.httpServer = http.createServer(this.app)

        // this.io = new socketIO.Server( this.httpServer )

        // this.io = new Server (this.httpServer)

        this.io = require('socket.io')(this.httpServer)

        this.escucharSockets();

    }

    private escucharSockets(){

        console.log('Escuchando conexiones')

        this.io.on('connection', (cliente: Socket) => {



            console.log( 'nuevo cliente conectado' )


            socket.mensaje( cliente, this.io )


            socket.desconectar( cliente )



        })
    }

    start(callback:any){
        this.httpServer.listen(this.port, callback)
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }
}