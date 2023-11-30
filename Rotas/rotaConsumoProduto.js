import { Router } from 'express';
import ConsumoProdutosCTRL from '../Controle/consumoProdutoCTRL.js';
// import ConsumoProdutoCTRL from '../Controle/pedidocompraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaConsumoProduto = new Router();
const controladorConsumoProduto = new ConsumoProdutosCTRL();

rotaConsumoProduto.get('/',controladorConsumoProduto.consultar)

.post('/',controladorConsumoProduto.gravar)
.delete('/',controladorConsumoProduto.excluir);

export default rotaConsumoProduto;