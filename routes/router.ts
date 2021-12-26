import { Router, Request, Response } from "express";
import SocketServer from "../classes/server";
import { UsuariosLista } from "../classes/usuarios-lista";
import { usuariosConectados } from "../sockets/sockets";

const router = Router();

router.get("/mensajes", (req: Request, res: Response) => {
	res.json({
		ok: true,
		msj: "get listoo",
	});
});

router.post("/mensajes", (req: Request, res: Response) => {
	const cuerpo = req.body.cuerpo;
	const de = req.body.de;

	res.json({
		ok: true,
		msj: "post listo",
		cuerpo,
		de,
	});
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
	const cuerpo = req.body.cuerpo;
	const de = req.body.de;
	const id = req.params.id;

	const payload = {
		de,
		cuerpo,
	};

	const server = SocketServer.instance;

	server.io.to(id).emit("mensaje-privado", payload);

	res.json({
		ok: true,
		msj: "post listo",
		cuerpo,
		de,
		id,
	});
});

// router.get("/usuarios", (req: Request, res: Response) => {
// 	const server = SocketServer.instance;

// 	server.io.clients((err: any, clientes: string[]) => {
// 		if (err) {
// 			return res.json({
// 				ok: false,
// 				err,
// 			});
// 		}

// 		res.json({
// 			ok: true,
// 			clientes,
// 		});
// 	});
// });

router.get("/usuarios", (req: Request, res: Response) => {
	res.json({
		ok: true,
		listaUsuarios: usuariosConectados.getLista(),
	});
});

export default router;
