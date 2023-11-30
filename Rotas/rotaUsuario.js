import { Router } from "express";
import UsuarioCTRL from "../Controle/usuarioCTRL.js";

const rotaUsuario = new Router();
const controladorUsuario = new UsuarioCTRL();

rotaUsuario.get('/', controladorUsuario.consultar);
rotaUsuario.post('/autenticar', controladorUsuario.autenticarUsuario); // Adiciona esta linha para a rota de autenticação
rotaUsuario.post('/', controladorUsuario.gravar);
rotaUsuario.put('/', controladorUsuario.atualizar);
rotaUsuario.delete('/', controladorUsuario.excluir);

export default rotaUsuario;