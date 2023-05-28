//As requisições que vierem da Internet (requisições HTTP) 
//precisarão ser traduzidas em requisições internas da nossa
//aplicação para que ela possa dar a resposta adequada.
import { Router } from 'express';
import CamareiraCTRL from '../Controle/camareiraCTRL.js';
// import CamareiraCTRL from '../Controle/camareiraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaCamareira = new Router();
const controladorCamareira = new CamareiraCTRL();
//http://dominio:porta/camareiras
//requisição e resposta são parâmetros passados automaticamente
// para os métodos da camada de controle

//De forma explícita conseguimos enxergar a interface da API
rotaCamareira.get('/',controladorCamareira.consultar)
.get('/:cpf',controladorCamareira.consultarCPF)
.post('/',controladorCamareira.gravar)
.put('/',controladorCamareira.atualizar)
.delete('/',controladorCamareira.excluir);

export default rotaCamareira;