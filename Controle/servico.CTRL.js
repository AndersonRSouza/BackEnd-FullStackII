import Servicos from "../Modelo/Servico.js";

export default class ServicoCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const valor = dados.valor;
            if (descricao && valor) {

                const servicos = new Servicos(0, descricao, valor);
                servicos
                .gravar()
                .then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Serviço adicionado com sucesso!",
                        codServico: servicos.codServico,
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível gravar o  serviço: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do consumo de servico. Verifique a documentação da API."
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
        if (requisicao.method === "PUT" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const codServico = dados.codServico
            const descricao = dados.descricao;
            const valor = dados.valor;
            if (codServico && descricao && valor) {

                const servico = new Servicos(codServico, descricao, valor);
                servico.atualizar().then(() => {
                    resposta.json({
                        status: true,
                        mensagem: " Servico atualizado com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar o consumo de servico: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do consumo de servico. Verifique a documentação da API."
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


    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const codServico = dados.codServico;
            if (codServico) {

                const servico = new Servicos(codServico);
                servico
                .removerDoBancoDados()
                .then(() => {
                        return servico.removerDoBancoDados();
                        })
                        .then(() => {
                        resposta.json({
                        status: true,
                        mensagem: "Servico excluído com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir o consumo de servico: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Informe o codigo do servico. Verifique a documentação da API."
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
            const servico = new Servicos();
            servico
            .consultar("")
            .then((servicos) => {
                resposta.status(200).json(servicos);
            })
            .catch((erro) => {
                resposta.json({
                    status: "false",
                    mensagem: "Falha ao obter consumo de servicos: " + erro.message
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

    