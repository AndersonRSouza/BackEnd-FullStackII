import { Router } from 'express';
import PedidoAcomodacoesCTRL from '../Controle/pedidoAcomodacaoCTRL.js';

// Router permite a criação de micro aplicações http
const rotaPedidoAcomodacao = new Router();
const controladorPedidoAcomodacao = new PedidoAcomodacoesCTRL();

rotaPedidoAcomodacao
  .get('/', controladorPedidoAcomodacao.consultar)
  .delete('/', controladorPedidoAcomodacao.excluir);

export default rotaPedidoAcomodacao;
