//As requisições que vierem da Internet (requisições HTTP) 
//precisarão ser traduzidas em requisições internas da nossa
//aplicação para que ela possa dar a resposta adequada.
import { Router } from 'express';
import ClienteCTRL from '../Controle/clienteCTRL.js';
// Router permite a criação de micro aplicações http

const rotaCliente = new Router();
const controladorCliente = new ClienteCTRL();
//http://dominio:porta/clientes
//requisição e resposta são parâmetros passados automaticamente
// para os métodos da camada de controle

//De forma explícita conseguimos enxergar a interface da API
rotaCliente.get('/',controladorCliente.consultar)
.get('/:cpf', controladorCliente.consultarCPF)
.post('/',controladorCliente.gravar)
.put('/',controladorCliente.atualizar)
.delete('/',controladorCliente.excluir);

export default rotaCliente;