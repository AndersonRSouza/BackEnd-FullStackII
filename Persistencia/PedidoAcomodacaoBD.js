import PedidoReserva from "../Modelo/PedidoReserva.js";
import conectar from "./Conexao.js";
import Hospede from "../Modelo/Hospede.js";
import pedidoAcomodacoes from "../Modelo/pedidoAcomodacao.js";

export default class PedidoAcomodacaoBD {
  async consultar() {
    const conexao = await conectar();
    //   const sql =
    //     "SELECT * FROM pedidocompras INNER JOIN fornecedor\
    //                                   ON pedidocompras.codFornecedor = fornecedor.codigo\
    //                                   INNER JOIN Pedido_Produtos\
    //                                   ON pedidocompras.codPedido = Pedido_Produtos.codProduto\
    //                                   INNER JOIN produto\
    //                                   ON Pedido_Produtos.codProduto = produto.codProduto";
    const sql =
      "SELECT pc.*, f.*, pp.* FROM pedidoreservas pc JOIN hospede\
       f ON pc.codHospede = f.cod_hosp \
       JOIN pedido_acomodacao pp ON pc.codPedido = pp.codPedido;";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoAcomodacoes = [];

    for (const registro of rows) {
      const hospede = new Hospede(
        registro["cod_hosp"],
        registro["nome"],
        registro["cpf"],
        registro["endereco"],
        registro["rg"],
        registro["telefone"],
        registro["email"],
        registro["datanasc"],
        registro["sexo"],
        registro["cep"]
      );

      const pedidoReserva = new PedidoReserva(
        registro["codPedido"],
        registro["acomodacao"],
        registro["quantidade"],
        registro["dataReserva"],
        hospede
      );

      const pedidoAcomodacao = new pedidoAcomodacoes(
        registro["codPedido"],
        registro["codigo"],
        registro["qtd"],
        registro["valor"],
        pedidoReserva
      );

      listaPedidoAcomodacoes.push(pedidoAcomodacao);
    }

    // Ordenar a lista pelo código do pedido
    listaPedidoAcomodacoes.sort((a, b) => a.codPedido - b.codPedido);

    return listaPedidoAcomodacoes;
  }
  // async excluirPedido(codPedido) {
  //   const conexao = await conectar();
  //   // Buscar o registro pai pelo código do pedido
  //   const objPai = buscarPai(codPedido);

  //   // Verificar se o registro pai foi encontrado
  //   if (objPai) {
  //     // Buscar os registros filhos pelo código do registro pai
  //     const arrayFilhos = buscarFilhos(objPai.Codigo);

  //     // Excluir os registros filhos
  //     arrayFilhos.forEach((objFilho) => {
  //       excluirFilho(objFilho.Codigo);
  //     });
      
  //     // Excluir o registro pai
  //     excluirRegistroPai(objPai.Codigo);
  //   } else {
  //     // Registro pai não encontrado
  //     console.log("Registro pai não encontrado.");
  //   }
  // }
    
    async excluirPai(codPedido) {
      // Executar a consulta SQL para excluir o registro filho pelo código do produto
      const sql =
      "DELETE FROM pedido_acomodacao WHERE codPedido = ? AND codigo = ?";
      queryExecute(sql, codPedido);
    }

    async excluirFilho(codigo) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo (opcional)
      
      // Executar a consulta SQL para excluir o registro filho pelo código do produto
      const sql = "DELETE FROM acomodacao WHERE codigo = ?";
      await queryExecute(sql, codigo);
    }
    
    
  async excluirRegistroPai(codPedido) {
    // Executar a consulta SQL para excluir o registro pai pelo código do pedido
    const sql = "DELETE FROM pedidoreservas WHERE cod_hosp = ?";
    queryExecute(sql, codPedido);
  }

  async consultarCodigo(codPedido) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM pedidoreservas INNER JOIN hospede ON pedidoreservas.codHospede = hospede.cod_hosp WHERE pedidoreservas.cod_hosp = ?";
    const valores = [codPedido];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoAcomodacoes = [];
    for (const registro of rows) {
      const hospede = new Hospede(
        registro["cod_hosp"],
        registro["nome"],
        registro["cpf"],
        registro["endereco"],
        registro["rg"],
        registro["telefone"],
        registro["email"],
        registro["datanasc"],
        registro["sexo"],
        registro["cep"]
      );
      const pedidoAcomodacao = new PedidoReserva(
        registro["codPedido"],
        registro["acomodacao"],
        registro["quantidade"],
        registro["dataReserva"],
        hospede
      );
      listaPedidoAcomodacoes.push(pedidoAcomodacao);
    }
    return listaPedidoAcomodacoes;
  }
}
