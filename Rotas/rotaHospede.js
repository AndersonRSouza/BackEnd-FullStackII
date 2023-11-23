import { Router } from 'express';
import HospedeCTRL from '../Controle/hospedeCTRL.js';

const rotaHospede = new Router();
const controladorHospede = new HospedeCTRL();

rotaHospede.get('/', controladorHospede.consultar)
  .get('/:cpf', controladorHospede.consultarCPF)
  .post('/', controladorHospede.gravar)
  .put('/', controladorHospede.atualizar)
  .delete('/', controladorHospede.excluir);

export default rotaHospede;
