import PedidoCompras from "../Modelo/PedidoCompras.js";
import conectar from "./Conexao.js";
import Fornecedor from "../Modelo/Fornecedor.js";
import pedidoProdutos from "../Modelo/pedidoProduto.js";

export default class PedidoProdutosBD {
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
      "SELECT pc.*, f.*, pp.* FROM pedidocompras pc JOIN fornecedor\
       f ON pc.codFornecedor = f.codigo \
       JOIN pedido_produtos pp ON pc.codPedido = pp.codPedido;";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoProdutos = [];

    for (const registro of rows) {
      const fornecedor = new Fornecedor(
        registro["codigo"],
        registro["razaoSocial"],
        registro["nomeFantasia"],
        registro["endereco"],
        registro["numero"],
        registro["complemento"],
        registro["bairro"],
        registro["cidade"],
        registro["uf"],
        registro["cep"],
        registro["pessoa"],
        registro["cnpj"],
        registro["estadual"],
        registro["municipal"],
        registro["email"],
        registro["celular"],
        registro["telefone"],
        registro["contato"]
      );

      const pedidoCompra = new PedidoCompras(
        registro["codPedido"],
        registro["produto"],
        registro["quantidade"],
        registro["dataCompra"],
        fornecedor
      );

      const pedidoProduto = new pedidoProdutos(
        registro["codPedido"],
        registro["codProduto"],
        registro["qtd"],
        registro["preco"],
        pedidoCompra
      );

      listaPedidoProdutos.push(pedidoProduto);
    }

    // Ordenar a lista pelo código do pedido
    listaPedidoProdutos.sort((a, b) => a.codPedido - b.codPedido);

    return listaPedidoProdutos;
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
      "DELETE FROM pedido_produtos WHERE codPedido = ? AND codProduto = ?";
      queryExecute(sql, codPedido);
    }

    async excluirFilho(codProduto) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo (opcional)
      
      // Executar a consulta SQL para excluir o registro filho pelo código do produto
      const sql = "DELETE FROM produto WHERE codProduto = ?";
      await queryExecute(sql, codProduto);
    }
    
    
  async excluirRegistroPai(codPedido) {
    // Executar a consulta SQL para excluir o registro pai pelo código do pedido
    const sql = "DELETE FROM pedidocompras WHERE codigo = ?";
    queryExecute(sql, codPedido);
  }

  async consultarCodigo(codPedido) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM pedidocompras INNER JOIN fornecedor ON pedidocompras.codFornecedor = fornecedor.codigo WHERE pedidocompras.codigo = ?";
    const valores = [codPedido];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoProdutos = [];
    for (const registro of rows) {
      const fornecedor = new Fornecedor(
        registro["codigo"],
        registro["razaoSocial"],
        registro["nomeFantasia"],
        registro["endereco"],
        registro["numero"],
        registro["complemento"],
        registro["bairro"],
        registro["cidade"],
        registro["uf"],
        registro["cep"],
        registro["pessoa"],
        registro["cnpj"],
        registro["estadual"],
        registro["municipal"],
        registro["email"],
        registro["celular"],
        registro["telefone"],
        registro["contato"]
      );
      const pedidoProduto = new PedidoCompras(
        registro["codPedido"],
        registro["produto"],
        registro["quantidade"],
        registro["dataCompra"],
        fornecedor
      );
      listaPedidoProdutos.push(pedidoProduto);
    }
    return listaPedidoProdutos;
  }
}
