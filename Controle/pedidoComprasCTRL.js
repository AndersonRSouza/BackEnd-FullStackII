// import PedidoCompra from "../Modelo/PedidoCompra.js";

import PedidoCompras from "../Modelo/PedidoCompras.js";

//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class PedidoComprasCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const produto = dados.produto; //se não for identificado atribui undefined
      const quantidade = dados.quantidade;
      const dataCompra = dados.dataCompra;
      const fornecedor = dados.fornecedor;
      if (
        produto &&
        quantidade &&
        dataCompra &&
        fornecedor
      ) {
        const pedidoCompras = new PedidoCompras(
          0,
          produto,
          quantidade,
          dataCompra,
          fornecedor
        );
        pedidoCompras
          .gravar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Pedido Compra adicionado com sucesso!",
              codPedido:pedidoCompras.codPedido
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar o pedidocompra: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o pedidocompra
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do pedido de compra. Verifique a documentação da API.",
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
      const codPedido = dados.codPedido;
      const produto = dados.produto; //se não for identificado atribui undefined
      const quantidade = dados.quantidade;
      const dataCompra = dados.dataCompra;
      const codFornecedor = dados.codFornecedor;
      if (
        codPedido &&
        produto &&
        quantidade &&
        dataCompra &&
        codFornecedor
      ) {
        const pedidoCompra = new PedidoCompras(
          codPedido,
          produto,
          quantidade,
          dataCompra,
          codFornecedor
        );
        pedidoCompra
          .atualizar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "PedidoCompra atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível atualizar o pedidocompra: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o pedidocompra
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do pedidocompra. Verifique a documentação da API.",
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

  //Ficou decidido que um pedidocompra será excluído se
  // o cpf dele for informado por meio de um objeto json
  excluir(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codPedido = dados.codPedido;
      if (codPedido) {
        const pedidoCompra = new PedidoCompras(codPedido);
        pedidoCompra
          .removerDoBancoDados()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "PedidoCompra excluído com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível excluir o pedidocompra: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o pedidocompra
        resposta.json({
          status: false,
          mensagem:
            "Informe o cpf do pedidocompra. Verifique a documentação da API.",
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
      const pedidoCompra = new PedidoCompras();
      pedidoCompra
        .consultar('')
        .then((pedidoCompras) => {          
          resposta.status(200).json(pedidoCompras);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter pedidocompraes: " + erro.message,
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
