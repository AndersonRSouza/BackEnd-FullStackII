import LoginController from '../Controle/loginCTRL';


const rotaLogin = new Router();
let ctrl = new LoginController();
rotaLogin.post('/autenticar', (req, res) => {
    //#swagger.tags = ['Login']
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/login"
                    }  
                }
            }
        } 
    */
    ctrl.autenticar(req, res);
})

module.exports = router;