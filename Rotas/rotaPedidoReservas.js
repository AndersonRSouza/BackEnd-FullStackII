//As requisições que vierem da Internet (requisições HTTP) 
//precisarão ser traduzidas em requisições internas da nossa
//aplicação para que ela possa dar a resposta adequada.
import { Router } from 'express';
import PedidoReservasCTRL from '../Controle/pedidoReservasCTRL.js';
// import PedidoCompraCTRL from '../Controle/pedidocompraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaPedidoReserva = new Router();
const controladorPedidoReserva = new PedidoReservasCTRL();

rotaPedidoReserva.get('/',controladorPedidoReserva.consultar)

.post('/',controladorPedidoReserva.gravar)
.delete('/',controladorPedidoReserva.excluir);


export default rotaPedidoReserva;