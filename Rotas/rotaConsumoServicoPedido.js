import { Router } from 'express';
import ConsumoServicoPedidosCTRL from '../Controle/consumoServicoPedidoCTRL.js';
// import PedidoCompraCTRL from '../Controle/pedidocompraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaConsumoServicoPedido = new Router();
const controladorConsumoServicoPedido = new ConsumoServicoPedidosCTRL();

rotaConsumoServicoPedido.get('/',controladorConsumoServicoPedido.consultar)

.delete('/',controladorConsumoServicoPedido.excluir)


export default rotaConsumoServicoPedido;