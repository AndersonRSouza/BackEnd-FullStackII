//As requisições que vierem da Internet (requisições HTTP) 
//precisarão ser traduzidas em requisições internas da nossa
//aplicação para que ela possa dar a resposta adequada.
import { Router } from 'express';
import PedidoComprasCTRL from '../Controle/pedidoComprasCTRL.js';
// import PedidoCompraCTRL from '../Controle/pedidocompraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaPedidoCompra = new Router();
const controladorPedidoCompra = new PedidoComprasCTRL();

rotaPedidoCompra.get('/',controladorPedidoCompra.consultar)

.post('/',controladorPedidoCompra.gravar)
.delete('/',controladorPedidoCompra.excluir);


export default rotaPedidoCompra;