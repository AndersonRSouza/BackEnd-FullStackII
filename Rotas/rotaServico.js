import { Router } from "express";
import ServicoCTRL from "../Controle/servico.CTRL.js";

const rotaServico = new Router();
const controladorServico = new ServicoCTRL();

rotaServico.get('/',controladorServico.consultar)
//.get('/:codigo', controladorServico.consultarCODIGO)
.post('/',controladorServico.gravar)
.put('/',controladorServico.atualizar)
.delete('/',controladorServico.excluir);

export default rotaServico;