import Cliente from "../Modelo/Cliente.js";

//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class ClienteCTRL {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome; //se não for identificado atribui undefined            
            const sobrenome = dados.sobrenome;
            const usuario = dados.usuario;
            const cidade = dados.cidade;
            const uf = dados.uf
            const cep = dados.cep;
            if (cpf && nome && sobrenome && usuario && cidade &&
                uf && cep) {

                const cliente = new Cliente(cpf, nome, sobrenome,
                    usuario, cidade, uf,cep);
                cliente.gravar().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cliente adicionado com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível gravar o cliente: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o cliente
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do cliente. Verifique a documentação da API."
                });
            }
        } //requisição não é POST ou não possui dados no formato json
        else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            })
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "PUT" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome; //se não for identificado atribui undefined            
            const sobrenome = dados.sobrenome;
            const usuario = dados.usuario;
            const cidade = dados.cidade;
            const uf = dados.uf
            const cep = dados.cep;
            if (cpf && nome && sobrenome && usuario && cidade &&
                uf && cep) {

                const cliente = new Cliente(cpf, nome, sobrenome,
                    usuario, cidade, uf,cep);
                cliente.atualizar().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cliente atualizado com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar o cliente: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o cliente
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do cliente. Verifique a documentação da API."
                });
            }
        } //requisição não é PUT ou não possui dados no formato json
        else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            })
        }
    }

    //Ficou decidido que um cliente será excluído se
    // o cpf dele for informado por meio de um objeto json
    excluir(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if (cpf) {

                const cliente = new Cliente(cpf);
                cliente.removerDoBancoDados().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cliente excluído com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir o cliente: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o cliente
                resposta.json({
                    status: false,
                    mensagem: "Informe o cpf do cliente. Verifique a documentação da API."
                });
            }
        } //requisição não é PUT ou não possui dados no formato json
        else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/JSON');
        if (requisicao.method === "GET") {
            const cliente = new Cliente();
            cliente.consultar("").then((listaClientes) => {
                resposta.json(listaClientes);
            }).catch((erro) => {
                resposta.json({
                    status: "false",
                    mensagem: "Falha ao obter clientes: " + erro.message
                });
            });
        }
        else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            })
        }
    }

    //Ficou decidido que será possível obter um cliente
    //informando seu cpf na url, por exemplo:
    //http://meubackend:4000/clientes/111.111.111-11
    //o parâmetro cpf,desta vez, está sendo informado na url
    consultarCPF(requisicao, resposta) {
        //params armazena os parâmetros informados na url
        //          requisicao.params['cpf']
        const cpf = requisicao.params.cpf;
        if (cpf) {
            if (requisicao.method === "GET") {
                const cliente = new Cliente();
                cliente.consultarCPF(cpf).then((cliente) => {
                    resposta.json(cliente);
                }).catch((erro) => {
                    resposta.json({
                        status: "false",
                        mensagem: "Falha ao obter o cliente: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Método não permitido. Verifique a documentação da API."
                })
            }
        }
    }
}
