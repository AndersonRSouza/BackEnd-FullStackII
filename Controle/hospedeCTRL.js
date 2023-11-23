import Hospede from "../Modelo/Hospede.js";

export default class HospedeCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const cpf = dados.cpf;
      const endereco = dados.endereco;
      const rg = dados.rg;
      const telefone = dados.telefone;
      const email = dados.email;
      const datanasc = dados.datanasc;
      const sexo = dados.sexo;
      const cep = dados.cep;

      if (
        nome &&
        cpf &&
        endereco &&
        rg &&
        telefone &&
        email &&
        datanasc &&
        sexo &&
        cep
      ) {
        const hospede = new Hospede(
          0,
          nome,
          cpf,
          endereco,
          rg,
          telefone,
          email,
          datanasc,
          sexo,
          cep
        );
        hospede
          .gravar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Hóspede adicionado com sucesso!",
              codigo: hospede.codigo,
            });
          })
          .catch((erro) => {
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar o hóspede: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do hóspede. Verifique a documentação da API.",
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
      const nome = dados.nome;
      const cpf = dados.cpf;
      const endereco = dados.endereco;
      const rg = dados.rg;
      const telefone = dados.telefone;
      const email = dados.email;
      const datanasc = dados.datanasc;
      const sexo = dados.sexo;
      const cep = dados.cep;

      if (
        codigo &&
        nome &&
        cpf &&
        endereco &&
        rg &&
        telefone &&
        email &&
        datanasc &&
        sexo &&
        cep
      ) {
        const hospede = new Hospede(
          codigo,
          nome,
          cpf,
          endereco,
          rg,
          telefone,
          email,
          datanasc,
          sexo,
          cep
        );
        hospede
          .atualizar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Hóspede atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível atualizar o hóspede: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do hóspede. Verifique a documentação da API.",
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
    resposta.type("application/json");

    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;

      if (codigo) {
        const hospede = new Hospede(codigo);
        hospede
          .removerItensDoBancoDados()
          .then(() => {
            return hospede.removerDoBancoDados();
          })
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Hóspede excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível excluir o hóspede: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe o CPF do hóspede. Verifique a documentação da API.",
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
    resposta.type("application/json");

    if (requisicao.method === "GET") {
      const hospede = new Hospede();
      hospede
        .consultar("")
        .then((listaHospedes) => {
          resposta.json(listaHospedes);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter hóspedes: " + erro.message,
          });
        });
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  consultarCPF(requisicao, resposta) {
    const cpf = requisicao.params.cpf;

    if (cpf) {
      if (requisicao.method === "GET") {
        const hospede = new Hospede();
        hospede
          .consultarCPF(cpf)
          .then((hospede) => {
            resposta.json(hospede);
          })
          .catch((erro) => {
            resposta.json({
              status: "false",
              mensagem: "Falha ao obter o hóspede: " + erro.message,
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
