//As requisições que vierem da Internet (requisições HTTP) 
//precisarão ser traduzidas em requisições internas da nossa
//aplicação para que ela possa dar a resposta adequada.
import { Router } from 'express';
import FornecedorCTRL from '../Controle/fornecedorCTRL.js';
// import FornecedorCTRL from '../Controle/fornecedorCTRL.js';
// Router permite a criação de micro aplicações http

const rotaFornecedor = new Router();
const controladorFornecedor = new FornecedorCTRL();
//http://dominio:porta/fornecedors
//requisição e resposta são parâmetros passados automaticamente
// para os métodos da camada de controle

//De forma explícita conseguimos enxergar a interface da API
rotaFornecedor.get('/',controladorFornecedor.consultar)
.get('/:cnpj',controladorFornecedor.consultarCNPJ)
.post('/',controladorFornecedor.gravar)
.put('/',controladorFornecedor.atualizar)
.delete('/',controladorFornecedor.excluir);

export default rotaFornecedor;