import conectar from './Conexao.js';
import Camareira from '../Modelo/Camareira.js';

export default class CamareiraBD {
  async incluir(camareira) {
    if (camareira instanceof Camareira) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO camareira(cpf,nome,dataNasc,endereco, \
                        bairro,cidade,uf,nis,genero) \
                                           VALUES(?,?,?,?,?,?,?,?,?)";
      const valores = [
        camareira.cpf,
        camareira.nome,
        camareira.dataNasc,
        camareira.endereco,
        camareira.bairro,
        camareira.cidade,
        camareira.uf,
        camareira.nis,
        camareira.genero
      ];
      await conexao.query(sql, valores);
    }
  }

  async alterar(camareira) {
    if (camareira instanceof Camareira) {
      const conexao = await conectar();
      const sql =
        "UPDATE camareira SET nome=?, dataNasc=?, endereco=?, \
            bairro=?, cidade=?, uf=?, nis=?, genero=? \
                       WHERE cpf=?";
      const valores = [       
        camareira.nome,
        camareira.dataNasc,
        camareira.endereco,
        camareira.bairro,
        camareira.cidade,
        camareira.uf,
        camareira.nis,
        camareira.genero,
        camareira.cpf
      ];
      await conexao.query(sql, valores);
    }
  }

  async excluir(camareira) {
    if (camareira instanceof Camareira) {
      const conexao = await conectar();
      const sql = "DELETE FROM camareira WHERE cpf=?";
      const valores = [camareira.cpf];
      await conexao.query(sql, valores);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM camareira WHERE nome LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    const listaCamareiras = [];
    for (const row of rows) {
      const camareira = new Camareira(
        row["cpf"],
        row["nome"],
        row["dataNasc"],
        row["endereco"],
        row["bairro"],
        row["cidade"],
        row["uf"],
        row["nis"],
        row["genero"]
      );
      listaCamareiras.push(camareira);
    }
    return listaCamareiras;
  }

  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM camareira WHERE cpf = ?";
    const valores = [cpf];
    const [rows] = await conexao.query(sql, valores);
    const listaCamareiras = [];
    for (const row of rows) {
      const camareira = new Camareira(
        row["cpf"],
        row["nome"],
        row["dataNasc"],
        row["endereco"],
        row["bairro"],
        row["cidade"],
        row["uf"],
        row["nis"],
        row["genero"]
      );
      listaCamareiras.push(camareira);
    }
    return listaCamareiras;
  }
}
