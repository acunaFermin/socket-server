import router from "./routes/router";
import cors from 'cors';


import bodyParser from "body-parser";
import SocketServer from "./classes/server";




const server = SocketServer.instance

server.app.use( bodyParser.urlencoded({extended:true}))
server.app.use( bodyParser.json())
server.app.use( cors({}) )

server.app.use('/', router);


server.start(() => {
    console.log(`servidor corriiendo en el puerto ${server.port}!`)
})
