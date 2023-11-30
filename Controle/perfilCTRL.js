import Perfis from "../Modelo/Perfil.js";

export default class PerfilCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const perfil_id = dados.perfil_id;
      const descricao = dados.descricao;
      if (perfil_id && descricao) {
        const perfis = new Perfis(perfil_id, descricao);
        perfis
          .gravar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Serviço adicionado com sucesso!",
              perfil_id: perfis.perfil_id,
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar o  serviço: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do consumo de perfil. Verifique a documentação da API.",
        });
      }
    } //requisição não é POST ou não possui dados no formato json
    else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const perfil_id = dados.perfil_id;
      const descricao = dados.descricao;
      if (perfil_id && descricao) {
        const perfis = new Perfis(perfil_id, descricao);
        perfis
          .atualizar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: " Perfil atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível atualizar o consumo de perfil: " +
                erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do consumo de perfil. Verifique a documentação da API.",
        });
      }
    } //requisição não é PUT ou não possui dados no formato json
    else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const perfil_id = dados.perfil_id;
      if (perfil_id) {
        const perfis = new Perfis(perfil_id);
        perfis
          .removerDoBancoDados()
          .then(() => {
            return perfis.removerDoBancoDados();
          })
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Perfil excluído com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível excluir o consumo de perfil: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe o codigo do perfil. Verifique a documentação da API.",
        });
      }
    } //requisição não é PUT ou não possui dados no formato json
    else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/JSON");
    if (requisicao.method === "GET") {
      const perfil = new Perfis();
      perfil
        .consultar("")
        .then((perfis) => {
          resposta.status(200).json(perfis);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter consumo de perfis: " + erro.message,
          });
        });
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }
}
