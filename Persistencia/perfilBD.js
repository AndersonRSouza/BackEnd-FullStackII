import conectar from './Conexao.js';
import Perfis from '../Modelo/Perfil.js';


export default class PerfisBD {
    async incluir(perfil) {
        if (perfil instanceof Perfis) {
            const conexao = await conectar();
            const sql = "INSERT INTO perfil(perfil_id,descricao)VALUES(?,?)";
            const valores = [perfil.perfil_id, perfil.descricao];
            const [result] = await conexao.query(sql, valores);
            perfil.perfil_id = result.insertPerfil_id;
        }

    }

    async alterar(perfil) {
        console.log("Chamando o método alterar...");
        if (perfil instanceof Perfis) {
          const conexao = await conectar();
          conexao.beginTransaction();
          const sql =
            "UPDATE perfil SET descricao=? WHERE perfil_id=?";
          console.log("Consulta SQL: ", sql);
          const valores = [
            perfil.descricao, 
            perfil.perfil_id
            ];
          
          console.log("Valores: ", valores);
          await conexao.query(sql, valores);
          conexao.commit();
          console.log("esta fazendo commit", conexao)
        }
      }

      async excluir(perfil) {
        console.log("Chamando o método excluir...");
        if (perfil instanceof Perfis) {
          const conexao = await conectar();
          const sql = "DELETE FROM perfil WHERE perfil_id=?";
          console.log("Consulta SQL: ", sql);
          const valores = [perfil.perfil_id];
          console.log("Valores: ", valores);
          await conexao.query(sql, valores);
          conexao.commit();
        }
      }
    

    
    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM perfil WHERE perfil_id";
        const valores = [];
        const [rows] = await conexao.query(sql, valores);
        const listaPerfis = [];

        for (const registro of rows) {
            const perfil = new Perfis(
                registro['perfil_id'],
                registro['descricao']
                );
            listaPerfis.push(perfil);
        }
        listaPerfis.sort((a, b) => a.perfil_id - b.perfil_id);
        
        return listaPerfis;
    }
}