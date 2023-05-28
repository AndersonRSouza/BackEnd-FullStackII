import PedidoCompras from "../Modelo/PedidoCompras.js";
// import PedidoCompra from '../Modelo/PedidoCompra.js';
import conectar from "./Conexao.js";
import Fornecedor from "../Modelo/Fornecedor.js";

export default class PedidoComprasBD {
  async incluir(pedidoCompra) {
    if (pedidoCompra instanceof PedidoCompras) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO pedidocompras(produto,quantidade,dataCompra,codFornecedor) \
                                           VALUES(?,?,?,?)";
      const valores = [
        pedidoCompra.produto,
        pedidoCompra.quantidade,
        pedidoCompra.dataCompra,
        pedidoCompra.fornecedor.codigo,
      ];
      const [result] = await conexao.query(sql, valores);
      pedidoCompra.codPedido = result.insertCodPedido;
    }
  }

  // async alterar(pedidoCompra) {
  //   if (pedidoCompra instanceof PedidoCompras) {
  //     const conexao = await conectar();
  //     const sql =
  //       "UPDATE pedidocompras SET codigo=?,produto=?,quantidade=?,dataCompra=?,cod_fornecedor=?\
  //                      WHERE codigo=?";
  //     const valores = [
  //       pedidoCompra.codigo,
  //       pedidoCompra.produto,
  //       pedidoCompra.quantidade,
  //       pedidoCompra.dataCompra,
  //       pedidoCompra.cod_fornecedor,
        
  //     ];
  //     await conexao.query(sql, valores);
  //   }
  // }

  // async excluir(pedidoCompra) {
  //   if (pedidoCompra instanceof PedidoCompras) {
  //     const conexao = await conectar();
  //     const sql = "DELETE FROM pedidocompras WHERE codigo=?";
  //     const valores = [pedidoCompra.codigo];
  //     await conexao.query(sql, valores);
  //   }
  // }

  async consultar() {
    const conexao = await conectar();
    const sql = "SELECT * FROM pedidocompras INNER JOIN fornecedor ON pedidocompras.codFornecedor = fornecedor.codigo";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoCompras = [];
    let fornecedor = {}
    let pedidoCompra = {}
    for (const registro of rows) {
        fornecedor = new Fornecedor(registro['codigo'],registro['razaoSocial'],registro['nomeFantasia'],
                                          registro['endereco'],registro['numero'],registro['complemento'], registro['bairro'],
                                          registro['cidade'], registro['uf'], registro['cep'], registro['pessoa'], registro['cnpj'],
                                          registro['estadual'], registro['municipal'],registro['email'], registro['celular'],
                                          registro['telefone'], registro['contato']);      
    }
    for (const redPedido of rows) {        
        pedidoCompra = new PedidoCompras(
          redPedido["codPedido"],
          redPedido["produto"],
          redPedido["quantidade"],
          redPedido["dataCompra"],
          fornecedor
        );
    }
    listaPedidoCompras.push(pedidoCompra);
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