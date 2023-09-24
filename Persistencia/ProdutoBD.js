import conectar from "./Conexao.js";
import Produtos from "../Modelo/Produto.js";

export default class ProdutosBD {
  async incluir(produto) {
    if (produto instanceof Produtos) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO produto(nome,preco) \
                              VALUES(?,?)";
      const valores = [produto.nome, produto.preco];
      const [result] = await conexao.query(sql, valores);
      produto.codProduto = result.insertCodProduto;
    }
  }
  async consultar() {
    const conexao = await conectar();
    const sql = "SELECT * FROM produto WHERE codProduto";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaProdutos = [];

    for (const registro of rows) {
      const produto = new Produtos(
        registro["codProduto"],
        registro["nome"],
        registro["preco"]
      );

      listaProdutos.push(produto);
    }

    // Ordenar a lista pelo código do pedido
    listaProdutos.sort((a, b) => a.codProduto - b.codProduto);

    return listaProdutos;
  }
}
