// import Camareira from "../Modelo/Camareira.js";
import Camareira from "../Modelo/Camareira.js";
//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class CamareiraCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      const nome = dados.nome;
      const dataNasc = dados.dataNasc;
      const endereco = dados.endereco;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const nis = dados.nis;
      const genero = dados.genero;
      if (
        cpf &&
        nome &&
        dataNasc &&
        endereco &&
        bairro &&
        cidade &&
        uf &&
        nis &&
        genero
      ) {
        const camareira = new Camareira(
          cpf,
          nome,
          dataNasc,
          endereco,
          bairro,
          cidade,
          uf,
          nis,
          genero
        );
        camareira
          .gravar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Camareira adicionado com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar o camareira: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o camareira
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do camareira. Verifique a documentação da API.",
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
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      const nome = dados.nome; //se não for identificado atribui undefined
      const dataNasc = dados.dataNasc;
      const endereco = dados.endereco;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const nis = dados.nis;
      const genero = dados.genero;
      if (
        cpf &&
        nome &&
        dataNasc &&
        endereco &&
        bairro &&
        cidade &&
        uf &&
        nis &&
        genero
      ) {
        const camareira = new Camareira(
          cpf,
          nome,
          dataNasc,
          endereco,
          bairro,
          cidade,
          uf,
          nis,
          genero
        );
        camareira
          .atualizar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Camareira atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível atualizar o camareira: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o camareira
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do camareira. Verifique a documentação da API.",
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

  //Ficou decidido que um camareira será excluído se
  // o cpf dele for informado por meio de um objeto json
  excluir(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      if (codigo) {
        const camareira = new Camareira(codigo);
        camareira
          .removerDoBancoDados()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Camareira excluído com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem: "Não foi possível excluir o camareira: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o camareira
        resposta.json({
          status: false,
          mensagem:
            "Informe o cpf do camareira. Verifique a documentação da API.",
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
      const camareira = new Camareira();
      camareira.consultar("")
        .then((listaCamareiras) => {
          resposta.json(listaCamareiras);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter camareiras: " + erro.message,
          });
        });
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  //Ficou decidido que será possível obter um camareira
  //informando seu cpf na url, por exemplo:
  //http://meubackend:4000/camareiras/111.111.111-11
  //o parâmetro cpf,desta vez, está sendo informado na url
  consultarCPF(requisicao, resposta) {
    //params armazena os parâmetros informados na url
    //          requisicao.params['cpf']
    const cpf = requisicao.params.cpf;
    if (cpf) {
      if (requisicao.method === "GET") {
        const camareira = new Camareira();
        camareira
          .consultarCPF(cpf)
          .then((camareira) => {
            resposta.json(camareira);
          })
          .catch((erro) => {
            resposta.json({
              status: "false",
              mensagem: "Falha ao obter o camareira: " + erro.message,
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
