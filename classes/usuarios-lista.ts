import { Usuario } from "./usuario";

export class UsuariosLista {
	private lista: Usuario[] = [];

	constructor() {}

	agregar(usuario: Usuario) {
		this.lista.push(usuario);
		console.log("agregar:", this.lista);

		return usuario;
	}

	actualizarNombre(id: string, nombre: string) {
		for (let usuario of this.lista) {
			if (usuario.id === id) {
				usuario.nombre = Object.values(nombre)[0];
				break;
			}
		}

		console.log("======= Actualizando usuario =======");

		console.log("actualizarNombre:", this.lista);
	}

	public getLista() {
		return this.lista.filter((usuario) => usuario.nombre !== "sin-nombre");
	}

	getUsuario(id: string) {
		this.lista.find((usuario) => {
			return usuario.id === id;
		});
	}

	getUsuariosEnSala(sala: string) {
		return this.lista.filter((usuario) => {
			return usuario.sala === sala;
		});
	}

	borrarUsuario(id: string) {
		const usuarioTemp = this.getUsuario(id);

		this.lista = this.lista.filter((usuario) => {
			return usuario.id !== id;
		});

		return usuarioTemp;
	}
}
