import { Router } from 'express';
import ConsumoProdutoPedidosCTRL from '../Controle/consumoProdutoPedido.CTRL.js';
// import PedidoCompraCTRL from '../Controle/pedidocompraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaConsumoProdutoPedido = new Router();
const controladorConsumoProdutoPedido = new ConsumoProdutoPedidosCTRL();

rotaConsumoProdutoPedido.get('/',controladorConsumoProdutoPedido.consultar)

.delete('/',controladorConsumoProdutoPedido.excluir)


export default rotaConsumoProdutoPedido;