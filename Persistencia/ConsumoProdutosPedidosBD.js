import ConsumoProduto from "../Modelo/ConsumoProduto.js";
import conectar from "./Conexao.js";
import Hospede from "../Modelo/Hospede.js";
import ConsumoProdutosPedidos from "../Modelo/ConsumoProdutoPedido.js";

export default class ConsumoProdutosPedidosBD {
  async consultar() {
    const conexao = await conectar();
    //   const sql =
    //     "SELECT * FROM consumo_produto INNER JOIN hospede\
    //                                   ON consumo_produto.cod_hosp = hospede.codigo\
    //                                   INNER JOIN Pedido_Produtos\
    //                                   ON consumo_produto.codConsumoProduto = Pedido_Produtos.codProduto\
    //                                   INNER JOIN produto\
    //                                   ON Pedido_Produtos.codProduto = produto.codProduto";
    const sql =
      "SELECT pc.*, f.*, pp.* FROM consumo_produto pc JOIN hospede\
       f ON pc.codHospedeConsumo = f.cod_hosp \
       JOIN consumo_produto_pedido pp ON pc.codConsumoProduto = pp.codConsumoProduto;";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaConsumoProdutosPedidos = [];

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

      const consumoProduto = new ConsumoProduto(
        registro["codConsumoProduto"],
        registro["produto"],
        registro["quantidade"],
        registro["dataCompra"],
        hospede
      );

      const ConsumoProdutoPedido = new ConsumoProdutosPedidos(
        registro["codConsumoProduto"],
        registro["codProduto"],
        registro["qtd"],
        registro["preco"],
        consumoProduto
      );

      listaConsumoProdutosPedidos.push(ConsumoProdutoPedido);
    }

    // Ordenar a lista pelo código do pedido
    listaConsumoProdutosPedidos.sort((a, b) => a.codConsumoProduto - b.codConsumoProduto);

    return listaConsumoProdutosPedidos;
  }
  // async excluirPedido(codConsumoProduto) {
  //   const conexao = await conectar();
  //   // Buscar o registro pai pelo código do pedido
  //   const objPai = buscarPai(codConsumoProduto);

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
    
    async excluirPai(codConsumoProduto) {
      // Executar a consulta SQL para excluir o registro filho pelo código do produto
      const sql =
      "DELETE FROM consumo_produto_pedido WHERE codConsumoProduto = ? AND codProduto = ?";
      queryExecute(sql, codConsumoProduto);
    }

    async excluirFilho(codProduto) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo (opcional)
      
      // Executar a consulta SQL para excluir o registro filho pelo código do produto
      const sql = "DELETE FROM produto WHERE codProduto = ?";
      await queryExecute(sql, codProduto);
    }
    
    
  async excluirRegistroPai(codConsumoProduto) {
    // Executar a consulta SQL para excluir o registro pai pelo código do pedido
    const sql = "DELETE FROM consumo_produto WHERE cod_hosp = ?";
    queryExecute(sql, codConsumoProduto);
  }

  async consultarCodigo(codConsumoProduto) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM consumo_produto INNER JOIN hospede ON consumo_produto.codHospedeConsumo = hospede.cod_hosp WHERE consumo_produto.cod_hosp = ?";
    const valores = [codConsumoProduto];
    const [rows] = await conexao.query(sql, valores);
    const listaConsumoProdutosPedidos = [];
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
        registro["sexo"]
      );
      const ConsumoProdutoPedido = new ConsumoProduto(
        registro["codConsumoProduto"],
        registro["produto"],
        registro["quantidade"],
        registro["dataCompra"],
        hospede
      );
      listaConsumoProdutosPedidos.push(ConsumoProdutoPedido);
    }
    return listaConsumoProdutosPedidos;
  }
}
