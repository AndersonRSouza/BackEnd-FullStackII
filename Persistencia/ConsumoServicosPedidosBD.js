import ConsumoServicosPedidos from "../Modelo/ConsumoServicoPedido.js";
import conectar from "./Conexao.js";
import Hospede from "../Modelo/Hospede.js";
import ConsumoServico from "../Modelo/ConsumoServico.js";


export default class ConsumoServicoPedidosBD {
  async consultar() {
    const conexao = await conectar();
    //   const sql =
    //     "SELECT * FROM consumo_servico INNER JOIN hospede\
    //                                   ON consumo_servico.cod_hosp = hospede.codigo\
    //                                   INNER JOIN Pedido_Servicos\
    //                                   ON consumo_servico.codConsumoServico = Pedido_Servicos.codServico\
    //                                   INNER JOIN servico\
    //                                   ON Pedido_Servicos.codServico = servico.codServico";
    const sql =
      "SELECT pc.*, f.*, pp.* FROM consumo_servico pc JOIN hospede\
       f ON pc.codHospedeConsumo = f.cod_hosp \
       JOIN consumo_servico_pedido pp ON pc.codConsumoServico = pp.codConsumoServico;";
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaConsumoServicosPedidos = [];

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

      const consumoServico = new ConsumoServico(
        registro["codConsumoServico"],
        registro["servico"],
        registro["quantidade"],
        registro["dataServico"],
        hospede
      );

      const ConsumoServicoPedido = new ConsumoServicosPedidos(
        registro["codConsumoServico"],
        registro["codServico"],
        registro["qtd"],
        registro["valor"],
        consumoServico
      );

      listaConsumoServicosPedidos.push(ConsumoServicoPedido);
    }

    // Ordenar a lista pelo código do pedido
    listaConsumoServicosPedidos.sort((a, b) => a.codConsumoServico - b.codConsumoServico);

    return listaConsumoServicosPedidos;
  }
  // async excluirPedido(codConsumoServico) {
  //   const conexao = await conectar();
  //   // Buscar o registro pai pelo código do pedido
  //   const objPai = buscarPai(codConsumoServico);

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
    
    async excluirPai(codConsumoServico) {
      // Executar a consulta SQL para excluir o registro filho pelo código do servico
      const sql =
      "DELETE FROM consumo_servico_pedido WHERE codConsumoServico = ? AND codServico = ?";
      queryExecute(sql, codConsumoServico);
    }

    async excluirFilho(codServico) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo (opcional)
      
      // Executar a consulta SQL para excluir o registro filho pelo código do servico
      const sql = "DELETE FROM servico WHERE codServico = ?";
      await queryExecute(sql, codServico);
    }
    
    
  async excluirRegistroPai(codConsumoServico) {
    // Executar a consulta SQL para excluir o registro pai pelo código do pedido
    const sql = "DELETE FROM consumo_servico WHERE cod_hosp = ?";
    queryExecute(sql, codConsumoServico);
  }

  async consultarCodigo(codConsumoServico) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM consumo_servico INNER JOIN hospede ON consumo_servico.codHospedeConsumo = hospede.cod_hosp WHERE consumo_servico.cod_hosp = ?";
    const valores = [codConsumoServico];
    const [rows] = await conexao.query(sql, valores);
    const listaConsumoServicosPedidos = [];
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
      const ConsumoServicoPedido = new ConsumoServico(
        registro["codConsumoServico"],
        registro["servico"],
        registro["quantidade"],
        registro["dataServico"],
        hospede
      );
      listaConsumoServicosPedidos.push(ConsumoServicoPedido);
    }
    return listaConsumoServicosPedidos;
  }
}
