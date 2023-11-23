import Autorizacao from '../middlewares/autorizacao';
import PerfilController from '../Controle/perfilCTRL';

const rotaPerfil = new Router();

let auth = new Autorizacao();
let ctrl = new PerfilController();
rotaPerfil.get('/listar', auth.validarToken, 
(req, res) => {
    // #swagger.tags = ['Perfil']
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    ctrl.listar(req, res);
})


module.exports = router;