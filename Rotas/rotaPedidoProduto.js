import { Router } from 'express';
import PedidoProdutosCTRL from '../Controle/pedidoProdutoCTRL.js';
// import PedidoCompraCTRL from '../Controle/pedidocompraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaPedidoProduto = new Router();
const controladorPedidoProduto = new PedidoProdutosCTRL();

rotaPedidoProduto.get('/',controladorPedidoProduto.consultar)

.delete('/',controladorPedidoProduto.excluir)


export default rotaPedidoProduto;