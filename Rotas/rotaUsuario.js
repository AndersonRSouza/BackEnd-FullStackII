import UsuarioController from '../Controle/usuarioCTRL';
import Autorizacao from '../middlewares/autorizacao';
 
const rotaUsuario = new Router();

let ctrl = new UsuarioController();
let auth = new Autorizacao();

rotaUsuario.get("/obter/:id", auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    ctrl.obter(req, res);
})

rotaUsuario.get('/listar', 
auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    ctrl.listar(req, res);
});


rotaUsuario.post('/criar', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/usuario"
                    }  
                }
            }
        } 
    */
    ctrl.criar(req, res);

} );

rotaUsuario.put('/alterar', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/usuario"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req, res);

} );
rotaUsuario.delete('/excluir/:id', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    //  #swagger.parameters['id'] = { description: 'Id do usuário a ser excluído' }

    ctrl.excluir(req, res)
});

module.exports = router;