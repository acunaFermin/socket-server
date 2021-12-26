import { Socket } from "dgram";
import { Usuario } from "../classes/usuario";
import { UsuariosLista } from "../classes/usuarios-lista";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: any, io: any) => {
	const usuario = new Usuario(cliente.id);

	usuariosConectados.agregar(usuario);

	io.emit("usuarios-conectados", usuariosConectados.getLista());
};

export const desconectar = (cliente: any, io: any) => {
	cliente.on("disconnect", () => {
		usuariosConectados.borrarUsuario(cliente.id);

		io.emit("usuarios-conectados", usuariosConectados.getLista());
	});
};

export const mensaje = (cliente: any, io: Socket) => {
	cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
		io.emit("mensaje-nuevo", { payload, id: cliente.id });
	});
};

export const mensajePrivado = (cliente: any, io: any) => {
	cliente.on(
		"mensajePrivado",
		(payload: { de: string; cuerpo: string; id: string }) => {
			io.to(payload.id).emit("mensaje-privado", {
				payload,
				id: cliente.id,
			});
		}
	);
};

export const configurarUsuario = (cliente: any, io: any) => {
	cliente.on("config-usuario", (nombre: string, callback: Function) => {
		usuariosConectados.actualizarNombre(cliente.id, nombre);

		let user = Object.values(nombre);

		callback({
			ok: true,
			usuario: user,
			id: cliente.id,
		});

		io.emit("usuarios-conectados", usuariosConectados.getLista());
	});
};
