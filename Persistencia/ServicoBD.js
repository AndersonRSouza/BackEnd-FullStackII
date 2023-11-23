import conectar from './Conexao.js';
import Servicos from '../Modelo/Servico.js';


export default class ServicosBD {
    async incluir(servico) {
        if (servico instanceof Servicos) {
            const conexao = await conectar();
            const sql = "INSERT INTO servico(descricao,valor)VALUES(?,?)";
            const valores = [servico.descricao, servico.valor];
            const [result] = await conexao.query(sql, valores);
            servico.codServico = result.insertCodServico;
        }

    }

    async alterar(servico) {
        console.log("Chamando o método alterar...");
        if (servico instanceof Servicos) {
          const conexao = await conectar();
          conexao.beginTransaction();
          const sql =
            "UPDATE servico SET descricao=?,valor=? WHERE codServico=?";
          console.log("Consulta SQL: ", sql);
          const valores = [
            servico.descricao, 
            servico.valor,
            servico.codServico
            ];
          
          console.log("Valores: ", valores);
          await conexao.query(sql, valores);
          conexao.commit();
          console.log("esta fazendo commit", conexao)
        }
      }

      async excluir(servico) {
        console.log("Chamando o método excluir...");
        if (servico instanceof Servicos) {
          const conexao = await conectar();
          const sql = "DELETE FROM servico WHERE codServico=?";
          console.log("Consulta SQL: ", sql);
          const valores = [servico.codServico];
          console.log("Valores: ", valores);
          await conexao.query(sql, valores);
          conexao.commit();
        }
      }
    

    
    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM servico WHERE codServico";
        const valores = [];
        const [rows] = await conexao.query(sql, valores);
        const listaServicos = [];

        for (const registro of rows) {
            const servico = new Servicos(
                registro['codServico'],
                registro['descricao'],
                registro['valor']
                );
            listaServicos.push(servico);
        }
        listaServicos.sort((a, b) => a.codServico - b.codServico);
        
        return listaServicos;
    }
}