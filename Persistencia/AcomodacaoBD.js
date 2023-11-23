import Acomodacao from "../Modelo/Acomodacao.js"; 
import conectar from "./Conexao.js";

export default class AcomodacaoBD { 
  async incluir(acomodacao) { 
    if (acomodacao instanceof Acomodacao) { 
      const conexao = await conectar();
      const sql =
        "INSERT INTO acomodacao(num_acom, capacidade, tamanho, localizacao, descricao, valor) VALUES(?,?,?,?,?,?)"; 
      console.log("Consulta SQL: ", sql);
      const valores = [
        acomodacao.num_acom, 
        acomodacao.capacidade, 
        acomodacao.tamanho, 
        acomodacao.localizacao, 
        acomodacao.descricao,
        acomodacao.valor,
      ];
      const [result] = await conexao.query(sql, valores);
      acomodacao.codigo = result.insertCodigo;
      console.log("Valores: ", valores);
    }
  }

  async alterar(acomodacao) { 
    console.log("Chamando o método alterar...");
    if (acomodacao instanceof Acomodacao) {
      const conexao = await conectar();
      conexao.beginTransaction();
      const sql =
        "UPDATE acomodacao SET num_acom=?, capacidade=?, tamanho=?, localizacao=?, descricao=?, valor=? WHERE codigo=?";
      console.log("Consulta SQL: ", sql);
      const valores = [
        acomodacao.num_acom,
        acomodacao.capacidade,
        acomodacao.tamanho,
        acomodacao.localizacao,
        acomodacao.descricao,
        acomodacao.valor,
        acomodacao.codigo,
      ];
      console.log("Valores: ", valores);
      await conexao.query(sql, valores);
      conexao.commit();
      console.log("Está fazendo commit", conexao)
    }
  }

  async excluir(acomodacao) {
    console.log("Chamando o método excluir...");
    if (acomodacao instanceof Acomodacao) { 
      const conexao = await conectar();
      const sql = "DELETE FROM acomodacao WHERE codigo=?";
      console.log("Consulta SQL: ", sql);
      const valores = [acomodacao.codigo];
      console.log("Valores: ", valores);
      await conexao.query(sql, valores);
      conexao.commit();
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM acomodacao WHERE num_acom LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    const listaAcomodacoes = [];
    for (const row of rows) {
      const acomodacao = new Acomodacao(
        row["codigo"],
        row["num_acom"],
        row["capacidade"],
        row["tamanho"],
        row["localizacao"],
        row["descricao"],
        row["valor"]
      );
      listaAcomodacoes.push(acomodacao);
    }
    return listaAcomodacoes;
  }

  async consultarCodigo(codigo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM acomodacao WHERE codigo = ?";
    const valores = [codigo];
    const [rows] = await conexao.query(sql, valores);
    const listaAcomodacoes = [];
    for (const row of rows) {
      const acomodacao = new Acomodacao(
        row["codigo"],
        row["num_acom"],
        row["capacidade"],
        row["tamanho"],
        row["localizacao"],
        row["descricao"],
        row["valor"]
      );
      listaAcomodacoes.push(acomodacao);
    }
    return listaAcomodacoes;
  }
}
