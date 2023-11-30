import ConsumoServicos from "../Modelo/ConsumoServico.js";
import conectar from "./Conexao.js";
import Hospede from "../Modelo/Hospede.js";


export default class ConsumoServicosBD {
  async incluir(consumoServico) {
    console.log("incluir pedido compra", consumoServico)
    // console.log(consumoServico)
    if (consumoServico instanceof ConsumoServicos) {
      const conexao = await conectar();
      conexao.beginTransaction();
      const sql =
        "INSERT INTO consumo_servico(dataServico,codHospedeConsumoServico) \
                                           VALUES(?,?)";
      const valores = [
        consumoServico.dataServico,
        consumoServico.hospede.cod_hosp,
      ];
      const [result] = await conexao.query(sql, valores);
      console.log("teste result", result)
      console.log("chegou até consumoServico")
      consumoServico.codConsumoServico = result.insertId;
      console.log("pedido", consumoServico.codConsumoServico)
      consumoServico.listaServicos.forEach(async(item) => { console.log("item ", item)
        const sqlItensPedido = "INSERT INTO consumo_servico_pedido(codConsumoServico, codServico, qtd, valor)\
                                  VALUES (?,?,?,?)";
        const parametrosItensPedido = [consumoServico.codConsumoServico,item.codServico,item.qtd,item.valor];
        
        await conexao.execute(sqlItensPedido,parametrosItensPedido)
      });
      
      conexao.commit();
    }
  }
  async excluirConsumoServicoPedido(codConsumoServico){
    const conexao = await conectar();
      conexao.beginTransaction();
      
      const sql = "DELETE FROM consumo_servico_pedido WHERE codConsumoServico = ?";
      const valores = [codConsumoServico];
      await conexao.query(sql, valores);
      
      conexao.commit();
  }
  async excluir(consumoServico) {
    if (consumoServico instanceof ConsumoServicos) {
      const conexao = await conectar();
      conexao.beginTransaction();
      
      // Excluir os registros na tabela Pedido_Servicos relacionados ao pedido de compra
      // const pedidoServicosBD = new ConsumoServicosPedidosBD();
      // await pedidoServicosBD.excluirPorPedido(consumoServico.codConsumoServico);

      // Excluir o registro na tabela ConsumoServicos
      const sql = "DELETE FROM consumo_servico WHERE codConsumoServico = ?";
      const valores = [consumoServico.codConsumoServico];
      await conexao.query(sql, valores);
      
      conexao.commit();
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql =
      "SELECT p.*, f.*, (SELECT SUM(pp.qtd * pp.valor) FROM consumo_servico_pedido pp WHERE p.codConsumoServico=pp.codConsumoServico) AS total FROM consumo_servico p INNER JOIN hospede f ON p.codHospedeConsumoServico = f.cod_hosp;";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaConsumoServicos = [];
    
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
  
      const consumoServico = new ConsumoServicos (
        registro["codConsumoServico"],
        // registro["cod_hosp"],
        registro["dataServico"],
        registro["total"],
        // registro["razaoSocial"],
        hospede,
        null
      );
  
      listaConsumoServicos.push(consumoServico);
    }
  
    // Ordenar a lista pelo código do pedido
    listaConsumoServicos.sort((a, b) => a.codConsumoServico - b.codConsumoServico);
  
    return listaConsumoServicos;
  }
    
  async consultarCodigo(codConsumoServico){
    const conexao = await conectar();
    const sql = "SELECT * FROM consumo_servico INNER JOIN hospede ON consumo_servico.codHospedeConsumoServico = hospede.cod_hosp WHERE consumo_servico.hosp_cod = ?";
    const valores = [codConsumoServico];
    const [rows] = await conexao.query(sql, valores);
    const listaConsumoServicos = [];
    for (const registro of rows) {
        const hospede = new Hospede(registro['cod_hosp'],registro['nome'],registro['cpf'],
                                          registro['endereco'],registro['rg'],registro['telefone'], registro['email'],
                                          registro['datanasc'], registro['sexo'], registro['cep']);
        const consumoServico = new ConsumoServicos (
          registro["codConsumoServico"],
          registro["servico"],
          registro["quantidade"],
          registro["dataServico"],
          hospede
        );
        listaConsumoServicos.push(consumoServico);
      
    }
    return listaConsumoServicos;
  }
}