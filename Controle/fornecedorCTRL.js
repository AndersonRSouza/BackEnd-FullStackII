import Fornecedor from "../Modelo/Fornecedor.js";

//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class FornecedorCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const razaoSocial = dados.razaoSocial; //se não for identificado atribui undefined
      const nomeFantasia = dados.nomeFantasia;
      const endereco = dados.endereco;
      const numero = dados.numero;
      const complemento = dados.complemento;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const cep = dados.cep;
      const pessoa = dados.pessoa;
      const cnpj = dados.cnpj;
      const estadual = dados.estadual;
      const municipal = dados.municipal;
      const email = dados.email;
      const celular = dados.celular;
      const telefone = dados.telefone;
      const contato = dados.contato;
      if (
        razaoSocial &&
        nomeFantasia &&
        endereco &&
        numero &&
        complemento &&
        bairro &&
        cidade &&
        uf &&
        cep &&
        pessoa &&
        cnpj &&
        estadual &&
        municipal &&
        email &&
        celular &&
        telefone &&
        contato
      ) {
        const fornecedor = new Fornecedor(
          0,
          razaoSocial,
          nomeFantasia,
          endereco,
          numero,
          complemento,
          bairro,
          cidade,
          uf,
          cep,
          pessoa,
          cnpj,
          estadual,
          municipal,
          email,
          celular,
          telefone,
          contato
        );
        fornecedor
          .gravar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Fornecedor adicionado com sucesso!",
              codigo:fornecedor.codigo
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar o fornecedor: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o fornecedor
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do fornecedor. Verifique a documentação da API.",
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
      const codigo = dados.codigo;
      const razaoSocial = dados.razaoSocial; //se não for identificado atribui undefined
      const nomeFantasia = dados.nomeFantasia;
      const endereco = dados.endereco;
      const numero = dados.numero;
      const complemento = dados.complemento;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const cep = dados.cep;
      const pessoa = dados.pessoa;
      const cnpj = dados.cnpj;
      const estadual = dados.estadual;
      const municipal = dados.municipal;
      const email = dados.email;
      const celular = dados.celular;
      const telefone = dados.telefone;
      const contato = dados.contato;
      if (
        codigo &&
        razaoSocial &&
        nomeFantasia &&
        endereco &&
        numero &&
        complemento &&
        bairro &&
        cidade &&
        uf &&
        cep &&
        pessoa &&
        cnpj &&
        estadual &&
        municipal &&
        email &&
        celular &&
        telefone &&
        contato
      ) {
        const fornecedor = new Fornecedor(
          codigo,
          razaoSocial,
          nomeFantasia,
          endereco,
          numero,
          complemento,
          bairro,
          cidade,
          uf,
          cep,
          pessoa,
          cnpj,
          estadual,
          municipal,
          email,
          celular,
          telefone,
          contato
        );
        fornecedor
          .atualizar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Fornecedor atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível atualizar o fornecedor: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o fornecedor
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do fornecedor. Verifique a documentação da API.",
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

  //Ficou decidido que um fornecedor será excluído se
  // o cpf dele for informado por meio de um objeto json
  excluir(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      if (codigo) {
        const fornecedor = new Fornecedor(codigo);
        fornecedor
          .removerDoBancoDados()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Fornecedor excluído com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível excluir o fornecedor: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o fornecedor
        resposta.json({
          status: false,
          mensagem:
            "Informe o cpf do fornecedor. Verifique a documentação da API.",
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
      const fornecedor = new Fornecedor();
      fornecedor
        .consultar("")
        .then((listaFornecedores) => {          
          resposta.json(listaFornecedores);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter fornecedores: " + erro.message,
          });
        });
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  //Ficou decidido que será possível obter um fornecedor
  //informando seu cpf na url, por exemplo:
  //http://meubackend:4000/fornecedors/111.111.111-11
  //o parâmetro cpf,desta vez, está sendo informado na url
  consultarCNPJ(requisicao, resposta) {
    //params armazena os parâmetros informados na url
    //          requisicao.params['cpf']
    const cnpj = requisicao.params.cnpj;
    if (cnpj) {
      if (requisicao.method === "GET") {
        const fornecedor = new Fornecedor();
        fornecedor
          .consultarCNPJ(cnpj)
          .then((fornecedor) => {
            resposta.json(fornecedor);
          })
          .catch((erro) => {
            resposta.json({
              status: "false",
              mensagem: "Falha ao obter o fornecedor: " + erro.message,
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
