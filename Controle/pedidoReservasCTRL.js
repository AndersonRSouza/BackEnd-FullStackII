// import PedidoCompra from "../Modelo/PedidoCompra.js";

import PedidoReservas from "../Modelo/PedidoReserva.js";

//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class PedidoReservasCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body; //se não for identificado atribui undefined
      const dataReserva = dados.dataReserva;
      const hospede = dados.hospede;
      const listaAcomodacoes = dados.acomodacao;     
      if (
        dataReserva &&
        hospede &&
        listaAcomodacoes
      ) {
        console.log("passou pelo if")
        console.log("dataReserva", dataReserva)
        console.log("hospede", hospede)
        console.log("listaAcom", listaAcomodacoes)
        const pedidoReservas = new PedidoReservas(
          0,
          dataReserva,
          0,
          hospede,
          listaAcomodacoes
        );
        console.log("pedidoReserva novo")
        pedidoReservas
          .gravar()
          .then(() => {
            console.log("sucesso")
            resposta.json({
              status: true,
              mensagem: "Pedido Reserva adicionado com sucesso!",
              codPedido:pedidoReservas.codPedido
            });
          })
          .catch((erro) => {
            console.log("erro", erro)
            //funções de callback
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar o pedidoreserva: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o pedidocompra
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do pedido de reserva. Verifique a documentação da API.",
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
      const dataReserva = dados.dataReserva;
      const codHospede = dados.codHospede;
      if (
        codPedido &&
        dataReserva &&
        codHospede
      ) {
        const pedidoReserva = new PedidoReservas(
          codPedido,
          dataReserva,
          codHospede
        );
        pedidoReserva
          .atualizar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "PedidoReserva atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível atualizar o pedidoreserva: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o pedidocompra
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do pedidoreserva. Verifique a documentação da API.",
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
    // console.log("exclui função", requisicao)
  
    console.log("requisicao", requisicao.body)
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codPedido = dados.codPedido;
  
      if (codPedido) {
        const pedidoReserva = new PedidoReservas(codPedido);
  
        // Excluir os registros na tabela Pedido_Produtos relacionados ao pedido de compra
        pedidoReserva.removerItensDoBancoDados()
          .then(() => {
            // Em seguida, excluir o registro do pedido de compra na tabela pedidocompras
            return pedidoReserva.removerDoBancoDados();
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
              mensagem: "Não foi possível excluir o pedidoreserva: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem: "Informe o cpf do pedidoreserva. Verifique a documentação da API.",
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
      const pedidoReserva = new PedidoReservas();
      pedidoReserva
        .consultar('')
        .then((pedidoReservas) => {          
          resposta.status(200).json(pedidoReservas);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter pedido reserva: " + erro.message,
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
