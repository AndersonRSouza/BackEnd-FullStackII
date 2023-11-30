// import PedidoCompra from "../Modelo/PedidoCompra.js";

import ConsumoProdutos from "../Modelo/ConsumoProduto.js";

//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class ConsumoProdutosCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body; //se não for identificado atribui undefined
      const dataCompra = dados.dataCompra;
      const hospede = dados.hospede;
      const listaProdutos = dados.produtos;     
      if (
        dataCompra &&
        hospede &&
        listaProdutos
      ) {
        console.log("passou pelo if")
        console.log("dataCompra", dataCompra)
        console.log("hospede", hospede)
        console.log("listaProd", listaProdutos)
        const consumoProdutos = new ConsumoProdutos(
          0,
          dataCompra,
          0,
          hospede,
          listaProdutos
        );
        console.log("pedido Compras novo")
        consumoProdutos
          .gravar()
          .then(() => {
            console.log("sucesso")
            resposta.json({
              status: true,
              mensagem: "Pedido Compra adicionado com sucesso!",
              codConsumoProduto:consumoProdutos.codConsumoProduto
            });
          })
          .catch((erro) => {
            console.log("erro", erro)
            //funções de callback
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar o consumo do produto: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o consumo do produto
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do Consumo de produto. Verifique a documentação da API.",
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
      const codConsumoProduto = dados.codConsumoProduto;
      const dataCompra = dados.dataCompra;
      const cod_hosp = dados.cod_hosp;
      if (
        codConsumoProduto &&
        dataCompra &&
        cod_hosp
      ) {
        const consumoProduto = new ConsumoProdutos(
          codConsumoProduto,
          dataCompra,
          cod_hosp
        );
        consumoProduto
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
                "Não foi possível atualizar o consumo do produto: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o consumo do produto
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do consumo do produto. Verifique a documentação da API.",
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

  //Ficou decidido que um consumo do produto será excluído se
  // o cpf dele for informado por meio de um objeto json
  excluir(requisicao, resposta) {
    resposta.type("application/json");
    // console.log("exclui função", requisicao)
  
    console.log("requisicao", requisicao.body)
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codConsumoProduto = dados.codConsumoProduto;
  
      if (codConsumoProduto) {
        const consumoProduto = new ConsumoProdutos(codConsumoProduto);
  
        // Excluir os registros na tabela Pedido_Produtos relacionados ao pedido de compra
        consumoProduto.removerItensDoBancoDados()
          .then(() => {
            // Em seguida, excluir o registro do pedido de compra na tabela consumo do produtos
            return consumoProduto.removerDoBancoDados();
          })
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "PedidoCompra excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.json({
              status: false,
              mensagem: "Não foi possível excluir o consumo do produto: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem: "Informe o numero do consumo do produto. Verifique a documentação da API.",
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
    resposta.type("application/JSON");
    if (requisicao.method === "GET") {
      const consumoProduto = new ConsumoProdutos();
      consumoProduto
        .consultar('')
        .then((consumoProdutos) => {          
          resposta.status(200).json(consumoProdutos);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter pedido compras: " + erro.message,
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
