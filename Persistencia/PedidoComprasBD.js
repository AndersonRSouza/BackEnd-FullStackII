import PedidoCompras from "../Modelo/PedidoCompras.js";
// import PedidoCompra from '../Modelo/PedidoCompra.js';
import conectar from "./Conexao.js";
import Fornecedor from "../Modelo/Fornecedor.js";
import PedidoProdutosBD from "./PedidoProdutosBD.js";

export default class PedidoComprasBD {
  async incluir(pedidoCompra) {
    console.log("incluir pedido compra", pedidoCompra)
    // console.log(pedidoCompra)
    if (pedidoCompra instanceof PedidoCompras) {
      const conexao = await conectar();
      conexao.beginTransaction();
      const sql =
        "INSERT INTO pedidocompras(dataCompra,codFornecedor) \
                                           VALUES(?,?)";
      const valores = [
        pedidoCompra.dataCompra,
        pedidoCompra.fornecedor.codigo,
      ];
      const [result] = await conexao.query(sql, valores);
      console.log("teste result", result)
      console.log("chegou até pedidoCompra")
      pedidoCompra.codPedido = result.insertId;
      console.log("pedido", pedidoCompra.codPedido)
      pedidoCompra.listaProdutos.forEach(async(item) => { console.log("item ", item)
        const sqlItensPedido = "INSERT INTO Pedido_Produtos(codPedido, codProduto, qtd, preco)\
                                  VALUES (?,?,?,?)";
        const parametrosItensPedido = [pedidoCompra.codPedido,item.codProduto,item.qtd,item.preco];
        
        await conexao.execute(sqlItensPedido,parametrosItensPedido)
      });
      
      conexao.commit();
    }
  }
  async excluirPedidoProduto(codPedido){
    const conexao = await conectar();
      conexao.beginTransaction();
      
      const sql = "DELETE FROM pedido_produtos WHERE codPedido = ?";
      const valores = [codPedido];
      await conexao.query(sql, valores);
      
      conexao.commit();
  }
  async excluir(pedidoCompra) {
    if (pedidoCompra instanceof PedidoCompras) {
      const conexao = await conectar();
      conexao.beginTransaction();
      
      // Excluir os registros na tabela Pedido_Produtos relacionados ao pedido de compra
      // const pedidoProdutosBD = new PedidoProdutosBD();
      // await pedidoProdutosBD.excluirPorPedido(pedidoCompra.codPedido);

      // Excluir o registro na tabela PedidoCompras
      const sql = "DELETE FROM pedidocompras WHERE codPedido = ?";
      const valores = [pedidoCompra.codPedido];
      await conexao.query(sql, valores);
      
      conexao.commit();
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql =
      "SELECT p.*, f.*, (SELECT SUM(pp.qtd * pp.preco) FROM pedido_produtos pp WHERE p.codPedido=pp.codPedido) AS total FROM pedidocompras p INNER JOIN fornecedor f ON p.codFornecedor = f.codigo;";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoCompras = [];
    
    for (const registro of rows) {
      const fornecedor = new Fornecedor(
        registro['codigo'],
        registro['razaoSocial'],
        registro['nomeFantasia'],
        registro['endereco'],
        registro['numero'],
        registro['complemento'],
        registro['bairro'],
        registro['cidade'],
        registro['uf'],
        registro['cep'],
        registro['pessoa'],
        registro['cnpj'],
        registro['estadual'],
        registro['municipal'],
        registro['email'],
        registro['celular'],
        registro['telefone'],
        registro['contato']
      );
  
      const pedidoCompra = new PedidoCompras(
        registro["codPedido"],
        // registro["codFornecedor"],
        registro["dataCompra"],
        registro["total"],
        // registro["razaoSocial"],
        fornecedor,
        null
      );
  
      listaPedidoCompras.push(pedidoCompra);
    }
  
    // Ordenar a lista pelo código do pedido
    listaPedidoCompras.sort((a, b) => a.codPedido - b.codPedido);
  
    return listaPedidoCompras;
  }
    
  async consultarCodigo(codPedido){
    const conexao = await conectar();
    const sql = "SELECT * FROM pedidocompras INNER JOIN fornecedor ON pedidocompras.codFornecedor = fornecedor.codigo WHERE pedidocompras.codigo = ?";
    const valores = [codPedido];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoCompras = [];
    for (const registro of rows) {
        const fornecedor = new Fornecedor(registro['codigo'],registro['razaoSocial'],registro['nomeFantasia'],
                                          registro['endereco'],registro['numero'],registro['complemento'], registro['bairro'],
                                          registro['cidade'], registro['uf'], registro['cep'], registro['pessoa'], registro['cnpj'],
                                          registro['estadual'], registro['municipal'],registro['email'], registro['celular'],
                                          registro['telefone'], registro['contato']);
        const pedidoCompra = new PedidoCompras(
          registro["codPedido"],
          registro["produto"],
          registro["quantidade"],
          registro["dataCompra"],
          fornecedor
        );
        listaPedidoCompras.push(pedidoCompra);
      
    }
    return listaPedidoCompras;
  }
}