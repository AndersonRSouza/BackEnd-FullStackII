import ConsumoServicos from "../Modelo/ConsumoServico.js";

export default class ConsumoServicosCTRL {
    gravar(requisicao, resposta) {
      resposta.type("application/json");
      //resposta.headers('Content-Type','application/json');
      //no cabeçalho da requisição a propriedade Content-Type: application/json
      if (requisicao.method === "POST" && requisicao.is("application/json")) {
        const dados = requisicao.body; //se não for identificado atribui undefined
        const dataServico = dados.dataServico;
        const hospede = dados.hospede;
        const listaServicos = dados.servicos;     
        if (
          dataServico &&
          hospede &&
          listaServicos
        ) {
          console.log("passou pelo if")
          console.log("dataServico", dataServico)
          console.log("hospede", hospede)
          console.log("listaProd", listaServicos)
          const consumoServicos = new ConsumoServicos(
            0,
            dataServico,
            0,
            hospede,
            listaServicos
          );
          console.log("pedido Compras novo")
          consumoServicos
            .gravar()
            .then(() => {
              console.log("sucesso")
              resposta.json({
                status: true,
                mensagem: "Pedido Compra adicionado com sucesso!",
                codConsumoServico:consumoServicos.codConsumoServico
              });
            })
            .catch((erro) => {
              console.log("erro", erro)
              //funções de callback
              resposta.json({
                status: false,
                mensagem: "Não foi possível gravar o consumo do servico: " + erro.message,
              });
            });
        } else {
          //Faltam dados para o consumo do servico
          resposta.json({
            status: false,
            mensagem:
              "Informe todos os dados do Consumo de servico. Verifique a documentação da API.",
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
        const codConsumoServico = dados.codConsumoServico;
        const dataServico = dados.dataServico;
        const cod_hosp = dados.cod_hosp;
        if (
          codConsumoServico &&
          dataServico &&
          cod_hosp
        ) {
          const consumoServico = new ConsumoServicos(
            codConsumoServico,
            dataServico,
            cod_hosp
          );
          consumoServico
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
                  "Não foi possível atualizar o consumo do servico: " + erro.message,
              });
            });
        } else {
          //Faltam dados para o consumo do servico
          resposta.json({
            status: false,
            mensagem:
              "Informe todos os dados do consumo do servico. Verifique a documentação da API.",
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
  
    //Ficou decidido que um consumo do servico será excluído se
    // o cpf dele for informado por meio de um objeto json
    excluir(requisicao, resposta) {
      resposta.type("application/json");
      // console.log("exclui função", requisicao)
    
      console.log("requisicao", requisicao.body)
      if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
        const dados = requisicao.body;
        const codConsumoServico = dados.codConsumoServico;
    
        if (codConsumoServico) {
          const consumoServico = new ConsumoServicos(codConsumoServico);
    
          // Excluir os registros na tabela Pedido_Servicos relacionados ao pedido de compra
          consumoServico.removerItensDoBancoDados()
            .then(() => {
              // Em seguida, excluir o registro do pedido de compra na tabela consumo do servicos
              return consumoServico.removerDoBancoDados();
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
                mensagem: "Não foi possível excluir o consumo do servico: " + erro.message,
              });
            });
        } else {
          resposta.json({
            status: false,
            mensagem: "Informe o numero do consumo do servico. Verifique a documentação da API.",
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
        const consumoServico = new ConsumoServicos();
        consumoServico
          .consultar('')
          .then((consumoServicos) => {          
            resposta.status(200).json(consumoServicos);
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
  