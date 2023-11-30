// import ConsumoProduto from "../Modelo/ConsumoProduto.js";
import ConsumoProdutos from "../Modelo/ConsumoProduto.js";
import consumoProdutoPedidos from "../Modelo/ConsumoProdutoPedido.js";


//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class ConsumoProdutoPedidosCTRL {

  //Ficou decidido que um pedidocompra será excluído se
  // o cpf dele for informado por meio de um objeto json
  excluir(requisicao, resposta) {
    resposta.type("application/json");
    //resposta.headers('Content-Type','application/json');
    //no cabeçalho da requisição a propriedade Content-Type: application/json
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codConsumoProduto = dados.codConsumoProduto;
      if (codConsumoProduto) {
        const consumoProduto = new ConsumoProdutos(codConsumoProduto);
        consumoProduto
          .removerDoBancoDados()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "ConsumoProduto excluído com sucesso!",
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
      const consumoProdutoPedido = new consumoProdutoPedidos();
      consumoProdutoPedido
        .consultar('')
        .then((consumoProdutoPedidos) => {          
          resposta.status(200).json(consumoProdutoPedidos);
        })
        .catch((erro) => {
          resposta.json({
            status: "false",
            mensagem: "Falha ao obter pedido Produtos: " + erro.message,
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
