// import PedidoCompra from "../Modelo/PedidoCompra.js";
import PedidoAcomodacao from "../Modelo/pedidoAcomodacao.js"
import PedidoReservas from "../Modelo/PedidoReserva.js";


//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class PedidoAcomodacoesCTRL {

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
        const pedidoReserva = new PedidoReservas(codPedido);
        pedidoReserva
          .removerDoBancoDados()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "PedidoReserva excluído com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível excluir o pedidoreserva: " + erro.message,
            });
          });
      } else {
        //Faltam dados para o pedidocompra
        resposta.json({
          status: false,
          mensagem:
            "Informe o cpf do pedidoreserva. Verifique a documentação da API.",
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
      const pedidoAcomodacao = new PedidoAcomodacao();
      pedidoAcomodacao
        .consultar('')
        .then((pedidoAcomodacoes) => {          
          resposta.status(200).json(pedidoAcomodacoes);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter pedido Acomodacao: " + erro.message,
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
