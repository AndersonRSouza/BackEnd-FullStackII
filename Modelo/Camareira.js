// import CamareiraBD from "../Persistencia/CamareiraBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';
import CamareiraBD from "../Persistencia/CamareiraBD.js";
export default class Camareira {
  #cpf; //# define que um atributo seja privado
  #nome;
  #dataNasc;
  #endereco;
  #bairro;
  #cidade;
  #uf;
  #nis;
  #genero;

  //método construtor que define as informações necessárias para se criar um cliente
  constructor(
    cpf,
    nome,
    dataNasc,
    endereco,
    bairro,
    cidade,
    uf,
    nis,
    genero
  ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#dataNasc = dataNasc;
    this.#endereco = endereco;
    this.#bairro = bairro;
    this.#cidade = cidade;
    this.#uf = uf;
    this.#nis = nis;
    this.#genero = genero;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCPF) {
    this.#cpf = novoCPF;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    if (novoNome != "")
      //regra de negócio que impede que clientes existam com nomes vazios
      this.#nome = novoNome;
  }

  get dataNasc() {
    return this.#dataNasc;
  }

  set dataNasc(novaDataNasc) {
    this.#dataNasc = novaDataNasc;
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(novoEndereco) {
    this.#endereco = novoEndereco;
  }

  get bairro() {
    return this.#bairro;
  }

  set bairro(novoBairro) {
    this.#bairro = novoBairro;
  }
  get cidade() {
    return this.#cidade;
  }

  set cidade(novaCidade) {
    this.#cidade = novaCidade;
  }

  get uf() {
    return this.#uf;
  }

  set uf(novoUF) {
    this.#uf = novoUF;
  }

  get nis() {
    return this.#nis;
  }

  set nis(novoNis) {
    this.#nis = novoNis;
  }

  get genero() {
    return this.#genero;
  }

  set genero(novoGenero) {
    this.#genero = novoGenero;
  }

 
  //override ou sobrescrita do método toJSON
  toJSON() {
    return {
      cpf: this.#cpf,
      nome: this.#nome,
      dataNasc: this.#dataNasc,
      endereco: this.#endereco,
      bairro: this.#bairro,
      cidade: this.#cidade,
      uf: this.#uf,
      nis: this.#nis,
      genero: this.#genero,
    };
  }

  async gravar() {
    const camareiraDAO = new CamareiraBD();
    await camareiraDAO.incluir(this);
  }

  async atualizar() {
    const camareiraBD = new CamareiraBD();
    await camareiraBD.alterar(this);
  }

  async removerDoBancoDados() {
    const camareiraBD = new CamareiraBD();
    await camareiraBD.excluir(this);
  }

  async consultar(termo) {
    const camareiraBD = new CamareiraBD();
    const camareiras = await camareiraBD.consultar(termo);
    return camareiras;
  }

  async consultarCPF(cpf) {
    const camareiraBD = new CamareiraBD();
    const camareiras = await camareiraBD.consultarCPF(cpf);
    return camareiras;
  }
}
