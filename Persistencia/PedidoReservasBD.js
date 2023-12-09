import PedidoReserva from "../Modelo/PedidoReserva.js";
// import PedidoCompra from '../Modelo/PedidoCompra.js';
import conectar from "./Conexao.js";
import Hospede from "../Modelo/Hospede.js";
import PedidoProdutosBD from "./PedidoProdutosBD.js";

export default class PedidoReservasBD {
  async incluir(pedidoReserva) {
    console.log("incluir pedido reserva", pedidoReserva)
    // console.log(pedidoCompra)
    if (pedidoReserva instanceof PedidoReserva) {
      const conexao = await conectar();
      conexao.beginTransaction();
      const sql =
        "INSERT INTO pedidoreservas(dataReserva,codHospede) \
                                           VALUES(?,?)";
      const valores = [
        pedidoReserva.dataReserva,
        pedidoReserva.hospede.cod_hosp,
      ];
      const [result] = await conexao.query(sql, valores);
      console.log("teste result", result)
      console.log("chegou até pedidoReserva")
      pedidoReserva.codPedido = result.insertId;
      console.log("pedido", pedidoReserva.codPedido)
      pedidoReserva.listaAcomodacoes.forEach(async(item) => { console.log("item ", item)
        const sqlItensPedido = "INSERT INTO Pedido_Acomodacao(codPedido, codigo, qtd, valor)\
                                  VALUES (?,?,?,?)";
        const parametrosItensPedido = [pedidoReserva.codPedido,item.codigo,item.qtd,item.valor];
        
        await conexao.execute(sqlItensPedido,parametrosItensPedido)
      });
      
      conexao.commit();
    }
  }
  async excluirPedidoAcomodacao(codPedido){
    const conexao = await conectar();
      conexao.beginTransaction();
      
      const sql = "DELETE FROM pedido_acomodacao WHERE codPedido = ?";
      const valores = [codPedido];
      await conexao.query(sql, valores);
      
      conexao.commit();
  }
  async excluir(pedidoReserva) {
    if (pedidoReserva instanceof PedidoReserva) {
      const conexao = await conectar();
      conexao.beginTransaction();
      
      // Excluir os registros na tabela Pedido_Produtos relacionados ao pedido de compra
      // const pedidoProdutosBD = new PedidoProdutosBD();
      // await pedidoProdutosBD.excluirPorPedido(pedidoCompra.codPedido);

      // Excluir o registro na tabela PedidoCompras
      const sql = "DELETE FROM pedidoreservas WHERE codPedido = ?";
      const valores = [pedidoReserva.codPedido];
      await conexao.query(sql, valores);
      
      conexao.commit();
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql =
      "SELECT p.*, f.*, (SELECT SUM(pp.qtd * pp.valor) FROM pedido_acomodacao pp WHERE p.codPedido=pp.codPedido) AS total FROM pedidoreservas p INNER JOIN hospede f ON p.codHospede = f.cod_hosp;";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoReservas = [];
    
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
        // registro["codFornecedor"],
        registro["dataReserva"],
        registro["total"],
        // registro["razaoSocial"],
        hospede,
        null
      );
  
      listaPedidoReservas.push(pedidoReserva);
    }
  
    // Ordenar a lista pelo código do pedido
    listaPedidoReservas.sort((a, b) => a.codPedido - b.codPedido);
  
    return listaPedidoReservas;
  }
    
  async consultarCodigo(codPedido){
    const conexao = await conectar();
    const sql = "SELECT * FROM pedidoreservas INNER JOIN hospede ON pedidoreservas.codHospede = hospede.cod_hosp WHERE pedidoreservas.cod_hosp = ?";
    const valores = [codPedido];
    const [rows] = await conexao.query(sql, valores);
    const listaPedidoReservas = [];
    for (const registro of rows) {
        const hospede = new Hospede(registro["cod_hosp"],
        registro["nome"],
        registro["cpf"],
        registro["endereco"],
        registro["rg"],
        registro["telefone"],
        registro["email"],
        registro["datanasc"],
        registro["sexo"],
        registro["cep"]);
        const pedidoReserva = new PedidoReserva(
          registro["codPedido"],
          registro["acomodacao"],
          registro["quantidade"],
          registro["dataReserva"],
          hospede
        );
        listaPedidoReservas.push(pedidoReserva);
      
    }
    return listaPedidoReservas;
  }
}