import ConsumoProdutos from "../Modelo/ConsumoProduto.js";
// import PconsumoProduto from '../Modelo/PconsumoProduto.js';
import conectar from "./Conexao.js";
import Hospede from "../Modelo/Hospede.js";
import ConsumoProdutosPedidosBD from "./ConsumoProdutosPedidosBD.js";

export default class ConsumoProdutosBD {
  async incluir(consumoProduto) {
    console.log("incluir pedido compra", consumoProduto)
    // console.log(consumoProduto)
    if (consumoProduto instanceof ConsumoProdutos) {
      const conexao = await conectar();
      conexao.beginTransaction();
      const sql =
        "INSERT INTO consumo_produto(dataCompra,codHospedeConsumo) \
                                           VALUES(?,?)";
      const valores = [
        consumoProduto.dataCompra,
        consumoProduto.hospede.cod_hosp,
      ];
      const [result] = await conexao.query(sql, valores);
      console.log("teste result", result)
      console.log("chegou até consumoProduto")
      consumoProduto.codConsumoProduto = result.insertId;
      console.log("pedido", consumoProduto.codConsumoProduto)
      consumoProduto.listaProdutos.forEach(async(item) => { console.log("item ", item)
        const sqlItensPedido = "INSERT INTO consumo_produto_pedido(codConsumoProduto, codProduto, qtd, preco)\
                                  VALUES (?,?,?,?)";
        const parametrosItensPedido = [consumoProduto.codConsumoProduto,item.codProduto,item.qtd,item.preco];
        
        await conexao.execute(sqlItensPedido,parametrosItensPedido)
      });
      
      conexao.commit();
    }
  }
  async excluirConsumoProdutoPedido(codConsumoProduto){
    const conexao = await conectar();
      conexao.beginTransaction();
      
      const sql = "DELETE FROM consumo_produto_pedido WHERE codConsumoProduto = ?";
      const valores = [codConsumoProduto];
      await conexao.query(sql, valores);
      
      conexao.commit();
  }
  async excluir(consumoProduto) {
    if (consumoProduto instanceof ConsumoProdutos) {
      const conexao = await conectar();
      conexao.beginTransaction();
      
      // Excluir os registros na tabela Pedido_Produtos relacionados ao pedido de compra
      // const pedidoProdutosBD = new ConsumoProdutosPedidosBD();
      // await pedidoProdutosBD.excluirPorPedido(consumoProduto.codConsumoProduto);

      // Excluir o registro na tabela ConsumoProdutos
      const sql = "DELETE FROM consumo_produto WHERE codConsumoProduto = ?";
      const valores = [consumoProduto.codConsumoProduto];
      await conexao.query(sql, valores);
      
      conexao.commit();
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql =
      "SELECT p.*, f.*, (SELECT SUM(pp.qtd * pp.preco) FROM consumo_produto_pedido pp WHERE p.codConsumoProduto=pp.codConsumoProduto) AS total FROM consumo_produto p INNER JOIN hospede f ON p.codHospedeConsumo = f.cod_hosp;";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaConsumoProdutos = [];
    
    for (const registro of rows) {
      const hospede = new Hospede(
        registro['cod_hosp'],
        registro['nome'],
        registro['cpf'],
        registro['endereco'],
        registro['rg'],
        registro['telefone'],
        registro['email'],
        registro['datanasc'],
        registro['sexo'],
        registro['cep']
      );
  
      const consumoProduto = new ConsumoProdutos (
        registro["codConsumoProduto"],
        // registro["cod_hosp"],
        registro["dataCompra"],
        registro["total"],
        // registro["razaoSocial"],
        hospede,
        null
      );
  
      listaConsumoProdutos.push(consumoProduto);
    }
  
    // Ordenar a lista pelo código do pedido
    listaConsumoProdutos.sort((a, b) => a.codConsumoProduto - b.codConsumoProduto);
  
    return listaConsumoProdutos;
  }
    
  async consultarCodigo(codConsumoProduto){
    const conexao = await conectar();
    const sql = "SELECT * FROM consumo_produto INNER JOIN hospede ON consumo_produto.codHospedeConsumo = hospede.cod_hosp WHERE consumo_produto.hosp_cod = ?";
    const valores = [codConsumoProduto];
    const [rows] = await conexao.query(sql, valores);
    const listaConsumoProdutos = [];
    for (const registro of rows) {
        const hospede = new Hospede(registro['cod_hosp'],registro['nome'],registro['cpf'],
                                          registro['endereco'],registro['rg'],registro['telefone'], registro['email'],
                                          registro['datanasc'], registro['sexo'], registro['cep']);
        const consumoProduto = new ConsumoProdutos (
          registro["codConsumoProduto"],
          registro["produto"],
          registro["quantidade"],
          registro["dataCompra"],
          hospede
        );
        listaConsumoProdutos.push(consumoProduto);
      
    }
    return listaConsumoProdutos;
  }
}