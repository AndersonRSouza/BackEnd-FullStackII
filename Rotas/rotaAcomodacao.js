import { Router } from 'express';
import AcomodacaoCTRL from '../Controle/acomodacaoCTRL.js';

const rotaAcomodacao = new Router();
const controladorAcomodacao = new AcomodacaoCTRL();

rotaAcomodacao.get('/', controladorAcomodacao.consultar)
  .get('/:num_acom', controladorAcomodacao.consultarCodigo)
  .post('/', controladorAcomodacao.gravar)
  .put('/', controladorAcomodacao.atualizar)
  .delete('/', controladorAcomodacao.excluir);

export default rotaAcomodacao;
