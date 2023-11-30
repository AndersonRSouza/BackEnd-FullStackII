import { Router } from "express";
import PerfilCTRL from "../Controle/perfilCTRL.js";

const rotaPerfil = new Router();
const controladorPerfil = new PerfilCTRL();

rotaPerfil.get('/',controladorPerfil.consultar)
//.get('/:codigo', controladorPerfil.consultarCODIGO)
.post('/',controladorPerfil.gravar)
.put('/',controladorPerfil.atualizar)
.delete('/',controladorPerfil.excluir);

export default rotaPerfil;