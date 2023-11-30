import UsuarioBD from "../Persistencia/UsuarioBD.js";

export default class Usuario {
  #codUsuario;
  #nome;
  #perfil;
  #datacadastro;
  #senha;

  constructor(codUsuario, nome, perfil, datacadastro, senha) {
    this.#codUsuario = codUsuario;
    this.#nome = nome;
    this.#perfil = perfil;
    this.#datacadastro = datacadastro;
    this.#senha = senha;
  }

  get codUsuario() {
    return this.#codUsuario;
  }

  set codUsuario(novoCodUsuario) {
    if (novoCodUsuario !== "") this.#codUsuario = novoCodUsuario;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get perfil() {
    return this.#perfil;
  }

  set perfil(novoPerfil) {
    this.#perfil = novoPerfil;
  }

  get datacadastro() {
    return this.#datacadastro;
  }

  set datacadastro(novaDataCadastro) {
    this.#datacadastro = novaDataCadastro;
  }

  get senha() {
    return this.#senha;
  }

  set senha(novaSenha) {
    this.#senha = novaSenha;
  }

  // Sobrescrita do método toJSON
  toJSON() {
    return {
      codUsuario: this.#codUsuario,
      nome: this.#nome,
      perfil: this.#perfil,
      datacadastro: this.#datacadastro,
      senha: this.#senha,
    };
  }

  async gravar() {
    const usuarioDAO = new UsuarioBD();
    await usuarioDAO.incluir(this);
  }

  async atualizar() {
    const usuarioBD = new UsuarioBD();
    await usuarioBD.alterar(this);
  }

  async removerDoBancoDados() {
    const usuarioBD = new UsuarioBD();
    await usuarioBD.excluir(this);
  }

  async consultar(termo) {
    const usuarioBD = new UsuarioBD();
    const usuarios = await usuarioBD.consultar(termo);
    return usuarios;
  }

  async consultarCodigo(codigo) {
    const usuarioBD = new UsuarioBD();
    const usuarios = await usuarioBD.consultarCodigo(codigo);
    return usuarios;
  }
  static async consultarPorUsername(username) {
    const usuarioBD = new UsuarioBD();
    const usuarios = await usuarioBD.consultarPorUsername(username);

    // Se houver usuários correspondentes, retorne o primeiro (assumindo que o username é único)
    if (usuarios.length > 0) {
      const { codUsuario, nome, perfil, datacadastro, senha } = usuarios[0];
      return new Usuario(codUsuario, nome, perfil, datacadastro, senha);
    }

    return null; // Retorne null se nenhum usuário correspondente for encontrado
  }
}
