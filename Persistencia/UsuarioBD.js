import conectar from "./Conexao.js";
import Usuario from "../Modelo/usuarios.js";

export default class UsuarioBD {
  async incluir(usuario) {
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO usuario(nome, perfil, datacadastro, senha) VALUES (?, ?, ?, ?)";
      const valores = [
        usuario.nome,
        usuario.perfil,
        usuario.datacadastro,
        usuario.senha,
      ];
      const [result] = await conexao.query(sql, valores);
      usuario.codUsuario = result.insertCodUsuario;
    }
  }

  async alterar(usuario) {
    console.log("Chamando o método alterar...");
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      conexao.beginTransaction();
      const sql =
        "UPDATE usuario SET nome=?, perfil=?, datacadastro=?, senha=? WHERE codUsuario=?";
      console.log("Consulta SQL: ", sql);
      const valores = [
        usuario.nome,
        usuario.perfil,
        usuario.datacadastro,
        usuario.senha,
        usuario.codUsuario,
      ];

      console.log("Valores: ", valores);
      await conexao.query(sql, valores);
      conexao.commit();
      console.log("Fazendo commit", conexao);
    }
  }

  async excluir(usuario) {
    console.log("Chamando o método excluir...");
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql = "DELETE FROM usuario WHERE codUsuario=?";
      console.log("Consulta SQL: ", sql);
      const valores = [usuario.codUsuario];
      console.log("Valores: ", valores);
      await conexao.query(sql, valores);
      conexao.commit();
    }
  }

  async consultar() {
    const conexao = await conectar();
    const sql = 'SELECT * FROM usuario WHERE codUsuario';
    const valores = [];
    const [rows] = await conexao.query(sql, valores);
    const listaUsuarios = [];

    for (const registro of rows) {
      const usuario = new Usuario(
        registro["codUsuario"],
        registro["nome"],
        registro["perfil"],
        registro["datacadastro"],
        registro["senha"]
      );
      listaUsuarios.push(usuario);
    }
    listaUsuarios.sort((a, b) => a.codUsuario - b.codUsuario);

    return listaUsuarios;
  }
  async consultarPorUsername(username) {
    const conexao = await conectar();
    const sql = 'SELECT * FROM usuario WHERE nome = ?';
    const valores = [username];
    const [rows] = await conexao.query(sql, valores);
  
    return rows;
  }
}
