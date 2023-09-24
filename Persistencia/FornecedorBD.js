import Fornecedor from "../Modelo/Fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorBD {
  async incluir(fornecedor) {
    if (fornecedor instanceof Fornecedor) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO fornecedor(razaoSocial,nomeFantasia,endereco,numero, \
                complemento,bairro,cidade,uf,cep,pessoa,cnpj,estadual,municipal,email,celular,telefone,contato) \
                                           VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      const valores = [
        fornecedor.razaoSocial,
        fornecedor.nomeFantasia,
        fornecedor.endereco,
        fornecedor.numero,
        fornecedor.complemento,
        fornecedor.bairro,
        fornecedor.cidade,
        fornecedor.uf,
        fornecedor.cep,
        fornecedor.pessoa,
        fornecedor.cnpj,
        fornecedor.estadual,
        fornecedor.municipal,
        fornecedor.email,
        fornecedor.celular,
        fornecedor.telefone,
        fornecedor.contato,
      ];
      const [result] = await conexao.query(sql, valores);
      fornecedor.codigo = result.insertCodigo;
    }
  }

  async alterar(fornecedor) {
    console.log("Chamando o método alterar...");
    if (fornecedor instanceof Fornecedor) {
      const conexao = await conectar();
      conexao.beginTransaction();
      const sql =
        "UPDATE fornecedor SET codigo=?,razaoSocial=?,nomeFantasia=?,endereco=?,numero=?, \
            complemento=?,bairro=?,cidade=?,uf=?,cep=?,pessoa=?,cnpj=?,estadual=?,municipal=?,email=?,celular=?,telefone=?,contato=? \
                       WHERE codigo=?";
      console.log("Consulta SQL: ", sql);
      const codigo = fornecedor.codigo.toString(); // Converter para string
      const valores = [
        codigo, // Passar como string
        fornecedor.razaoSocial,
        fornecedor.nomeFantasia,
        fornecedor.endereco,
        fornecedor.numero,
        fornecedor.complemento,
        fornecedor.bairro,
        fornecedor.cidade,
        fornecedor.uf,
        fornecedor.cep,
        fornecedor.pessoa,
        fornecedor.cnpj,
        fornecedor.estadual,
        fornecedor.municipal,
        fornecedor.email,
        fornecedor.celular,
        fornecedor.telefone,
        fornecedor.contato,
      ];
      // const valores = [
      //   fornecedor.codigo,
      //   fornecedor.razaoSocial,
      //   fornecedor.nomeFantasia,
      //   fornecedor.endereco,
      //   fornecedor.numero,
      //   fornecedor.complemento,
      //   fornecedor.bairro,
      //   fornecedor.cidade,
      //   fornecedor.uf,
      //   fornecedor.cep,
      //   fornecedor.pessoa,
      //   fornecedor.cnpj,
      //   fornecedor.estadual,
      //   fornecedor.municipal,
      //   fornecedor.email,
      //   fornecedor.celular,
      //   fornecedor.telefone,
      //   fornecedor.contato,

      // ];
      console.log("Valores: ", valores);
      await conexao.query(sql, valores);
      conexao.commit();
    }
    console.log("esta fazendo commit", conexao)
  }

  async excluir(fornecedor) {
    if (fornecedor instanceof Fornecedor) {
      const conexao = await conectar();
      const sql = "DELETE FROM fornecedor WHERE codigo=?";
      const valores = [codigo];
      await conexao.query(sql, valores);
      conexao.commit();
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM fornecedor WHERE razaoSocial LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    const listaFornecedores = [];
    for (const row of rows) {
      const fornecedor = new Fornecedor(
        row["codigo"],
        row["razaoSocial"],
        row["nomeFantasia"],
        row["endereco"],
        row["numero"],
        row["complemento"],
        row["bairro"],
        row["cidade"],
        row["uf"],
        row["cep"],
        row["pessoa"],
        row["cnpj"],
        row["estadual"],
        row["municipal"],
        row["email"],
        row["celular"],
        row["telefone"],
        row["contato"]
      );
      listaFornecedores.push(fornecedor);
    }
    return listaFornecedores;
  }

  async consultarCNPJ(cnpj) {
    const conexao = await conectar();
    const sql = "SELECT * FROM fornecedor WHERE cnpj = ?";
    const valores = [cnpj];
    const [rows] = await conexao.query(sql, valores);
    const listaFornecedores = [];
    for (const row of rows) {
      const fornecedor = new Fornecedor(
        row["codigo"],
        row["razaoSocial"],
        row["nomeFantasia"],
        row["endereco"],
        row["numero"],
        row["complemento"],
        row["bairro"],
        row["cidade"],
        row["uf"],
        row["cep"],
        row["pessoa"],
        row["cnpj"],
        row["estadual"],
        row["municipal"],
        row["email"],
        row["celular"],
        row["telefone"],
        row["contato"]
      );
      listaFornecedores.push(fornecedor);
    }
    return listaFornecedores;
  }
}
