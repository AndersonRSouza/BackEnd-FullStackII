import PerfisBD from "../Persistencia/perfilBD.js";

export default class Perfis {
  #perfil_id;
  #descricao;

  constructor(perfil_id, descricao) {
    this.#perfil_id = perfil_id;
    this.#descricao = descricao;
  }

  get perfil_id() {
    return this.#perfil_id;
  }

  set perfil_id(novoPerfil_id) {
    if (novoPerfil_id != "") this.#perfil_id = novoPerfil_id;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(novaDescricao) {
    this.#descricao = novaDescricao;
  }

  //override ou sobrescrita do método toJSON
  toJSON() {
    return {
      perfil_id: this.#perfil_id,
      descricao: this.#descricao,
    };
  }

  async gravar() {
    const perfilDAO = new PerfisBD();
    await perfilDAO.incluir(this);
  }

  async atualizar() {
    const perfilBD = new PerfisBD();
    await perfilBD.alterar(this);
  }

  async removerDoBancoDados() {
    const perfilBD = new PerfisBD();
    await perfilBD.excluir(this);
  }

  async consultar(termo) {
    const perfilBD = new PerfisBD();
    const perfis = await perfilBD.consultar(termo);
    return perfis;
  }

  async consultarCODIGO(perfil_id) {
    const perfilBD = new PerfisBD();
    const perfis = await perfilBD.consultarCODIGO(perfil_id);
    return perfis;
  }
}
