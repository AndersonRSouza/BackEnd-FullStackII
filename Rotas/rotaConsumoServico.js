import { Router } from 'express';
import ConsumoServicosCTRL from '../Controle/consumoServicoCTRL.js';
// import ConsumoServicoCTRL from '../Controle/pedidocompraCTRL.js';
// Router permite a criação de micro aplicações http

const rotaConsumoServico = new Router();
const controladorConsumoServico = new ConsumoServicosCTRL();

rotaConsumoServico.get('/',controladorConsumoServico.consultar)

.post('/',controladorConsumoServico.gravar)
.delete('/',controladorConsumoServico.excluir);

export default rotaConsumoServico;