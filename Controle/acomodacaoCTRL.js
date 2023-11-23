import Acomodacao from "../Modelo/Acomodacao.js";

export default class AcomodacaoCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const num_acom = dados.num_acom;
      const capacidade = dados.capacidade;
      const tamanho = dados.tamanho;
      const localizacao = dados.localizacao;
      const descricao = dados.descricao;
      const valor = dados.valor;

      if (
        num_acom &&
        capacidade &&
        tamanho &&
        localizacao &&
        descricao &&
        valor
      ) {
        const acomodacao = new Acomodacao(
          0,
          num_acom,
          capacidade,
          tamanho,
          localizacao,
          descricao,
          valor
        );
        acomodacao
          .gravar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Acomodação adicionada com sucesso!",
              codigo: acomodacao.codigo,
            });
          })
          .catch((erro) => {
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar a acomodação: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados da acomodação. Verifique a documentação da API.",
        });
      }
    } else {
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
      const codigo = dados.codigo;
      const num_acom = dados.num_acom;
      const capacidade = dados.capacidade;
      const tamanho = dados.tamanho;
      const localizacao = dados.localizacao;
      const descricao = dados.descricao;
      const valor = dados.valor;

      if (
        codigo &&
        num_acom &&
        capacidade &&
        tamanho &&
        localizacao &&
        descricao &&
        valor
      ) {
        const acomodacao = new Acomodacao(
          codigo,
          num_acom,
          capacidade,
          tamanho,
          localizacao,
          descricao,
          valor
        );
        acomodacao
          .atualizar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Acomodação atualizada com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível atualizar a acomodação: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados da acomodação. Verifique a documentação da API.",
        });
      }
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application.json");

    if (requisicao.method === "DELETE" && requisicao.is("application.json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;

      if (codigo) {
        const acomodacao = new Acomodacao(codigo);
        acomodacao
          .removerItensDoBancoDados()
          .then(() => {
            return acomodacao.removerDoBancoDados();
          })
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Acomodação excluída com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível excluir a acomodação: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe o código da acomodação. Verifique a documentação da API.",
        });
      }
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application.json");

    if (requisicao.method === "GET") {
      const acomodacao = new Acomodacao();
      acomodacao
        .consultar("")
        .then((listaAcomodacoes) => {
          resposta.json(listaAcomodacoes);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter acomodações: " + erro.message,
          });
        });
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  consultarCodigo(requisicao, resposta) {
    const codigo = requisicao.params.codigo;

    if (codigo) {
      if (requisicao.method === "GET") {
        const acomodacao = new Acomodacao();
        acomodacao
          .consultarCodigo(codigo)
          .then((acomodacao) => {
            resposta.json(acomodacao);
          })
          .catch((erro) => {
            resposta.json({
              status: "false",
              mensagem: "Falha ao obter a acomodação: " + erro.message,
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
}
