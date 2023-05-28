//As requisições que vierem da Internet (requisições HTTP) 
//precisarão ser traduzidas em requisições internas da nossa
//aplicação para que ela possa dar a resposta adequada.
import { Router } from 'express';
import PedidoComprasCTRL from '../Controle/pedidoComprasCTRL.js';
// import PedidoCompraCTRL from '../Controle/pedidocompraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaPedidoCompra = new Router();
const controladorPedidoCompra = new PedidoComprasCTRL();
//http://dominio:porta/pedidocompras
//requisição e resposta são parâmetros passados automaticamente
// para os métodos da camada de controle

//De forma explícita conseguimos enxergar a interface da API
rotaPedidoCompra.get('/',controladorPedidoCompra.consultar)
// .get('/:cnpj',controladorPedidoCompra.consultarCNPJ)
.post('/',controladorPedidoCompra.gravar)
// .put('/',controladorPedidoCompra.atualizar)
// .delete('/',controladorPedidoCompra.excluir);

export default rotaPedidoCompra;