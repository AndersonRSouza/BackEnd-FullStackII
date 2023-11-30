import Hospede from "../Modelo/Hospede.js"; 
import conectar from "./Conexao.js";

export default class HospedeBD { 
  async incluir(hospede) { 
    if (hospede instanceof Hospede) { 
      const conexao = await conectar();
      const sql =
        "INSERT INTO hospede(nome, cpf, endereco, rg, telefone, email, datanasc, sexo, cep) VALUES(?,?,?,?,?,?,?,?,?)"; 
      console.log("Consulta SQL: ", sql);
      const valores = [
        hospede.nome, 
        hospede.cpf, 
        hospede.endereco, 
        hospede.rg, 
        hospede.telefone, 
        hospede.email,
        hospede.datanasc, 
        hospede.sexo, 
        hospede.cep,
      ];
      const [result] = await conexao.query(sql, valores);
      hospede.cod_hosp = result.insertCodigo;
      console.log("Valores: ", valores);
    }
  }

  async alterar(hospede) { 
    console.log("Chamando o método alterar...");
    if (hospede instanceof Hospede) {
      const conexao = await conectar();
      conexao.beginTransaction();
      const sql =
        "UPDATE hospede SET nome=?, cpf=?, endereco=?, rg=?, telefone=?, email=?, datanasc=?, sexo=?, cep=? WHERE cod_hosp=?";
      console.log("Consulta SQL: ", sql);
      const valores = [
        hospede.nome,
        hospede.cpf,
        hospede.endereco,
        hospede.rg,
        hospede.telefone,
        hospede.email,
        hospede.datanasc,
        hospede.sexo,
        hospede.cep,
        hospede.cod_hosp,
      ];
      console.log("Valores: ", valores);
      await conexao.query(sql, valores);
      conexao.commit();
      console.log("Está fazendo commit", conexao)
    }
  }

  async excluir(hospede) {
    console.log("Chamando o método excluir...");
    if (hospede instanceof Hospede) { 
      const conexao = await conectar();
      const sql = "DELETE FROM hospede WHERE cod_hosp=?";
      console.log("Consulta SQL: ", sql);
      const valores = [hospede.cod_hosp];
      console.log("Valores: ", valores);
      await conexao.query(sql, valores);
      conexao.commit();
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM hospede WHERE nome LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    const listaHospedes = [];
    for (const row of rows) {
      const hospede = new Hospede(
        row["cod_hosp"],
        row["nome"],
        row["cpf"],
        row["endereco"],
        row["rg"],
        row["telefone"],
        row["email"],
        row["datanasc"],
        row["sexo"],
        row["cep"]
      );
      listaHospedes.push(hospede);
    }
    return listaHospedes;
  }

  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM hospede WHERE cpf = ?";
    const valores = [cpf];
    const [rows] = await conexao.query(sql, valores);
    const listaHospedes = [];
    for (const row of rows) {
      const hospede = new Hospede(
        row["cod_hosp"],
        row["nome"],
        row["cpf"],
        row["endereco"],
        row["rg"],
        row["telefone"],
        row["email"],
        row["datanasc"],
        row["sexo"],
        row["cep"]
      );
      listaHospedes.push(hospede);
    }
    return listaHospedes;
  }
}
