import HospedeBD from "../Persistencia/HospedeBD.js";
// import FornecedorBD from "../Persistencia/FornecedorBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';

export default class Hospede {
    #codigo; //# define que um atributo seja privado
    #nome;
    #cpf;
    #endereco;
    #rg;
    #telefone;
    #email;
    #datanasc;
    #sexo;
    #cep;

  //método construtor que define as informações necessárias para se criar um cliente
  constructor(
    codigo,
    nome,
    cpf,
    endereco,
    rg,
    telefone,
    email,
    datanasc,
    sexo,
    cep
    
  ) {
    this.#codigo = codigo;
    this.#nome = nome;
    this.#cpf = cpf;
    this.#endereco = endereco;
    this.#rg = rg;
    this.#telefone = telefone;
    this.#email = email;
    this.#datanasc = datanasc;
    this.#sexo = sexo;
    this.#cep = cep;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
      if (typeof novoNome === 'string')
      this.#nome = novoNome;
      else
      throw new Error("O nome deve ser uma string válida.");
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(novoEndereco) {
    this.#endereco = novoEndereco;
  }
  get rg() {
    return this.#rg;
  }

  set rg(novoRg) {
    this.#rg = novoRg;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get datanasc() {
    return this.#datanasc;
  }

  set datanasc(novaDatanasc) {
    this.#datanasc = novaDatanasc;
  }

  get sexo() {
    return this.#sexo;
  }

  set sexo(novoSexo) {
    this.#sexo = novoSexo;
  }

  get cep() {
    return this.#cep;
  }

  set cep(novoCep) {
    this.#cep = novoCep;
  }


  //override ou sobrescrita do método toJSON
  toJSON() {
    return {
        codigo: this.#codigo,
        nome: this.#nome,
        cpf: this.#cpf,
        endereco: this.#endereco,
        rg: this.#rg,
        telefone: this.#telefone,
        email: this.#email,
        datanasc: this.#datanasc,
        sexo: this.#sexo,
        cep: this.#cep,
    };
   }

  async gravar() {
    const hospedeDAO = new HospedeBD();
    await hospedeDAO.incluir(this);
  }

  async atualizar() {
    const hospedeBD = new HospedeBD();
    await hospedeBD.alterar(this);
  }

  async removerItensDoBancoDados() {
    const hospedeBD = new HospedeBD();
    await hospedeBD.excluir(this);
  }

  async consultar(termo) {
    const hospedeBD = new HospedeBD();
    const hospedes = await hospedeBD.consultar(termo);
    return hospedes;
  }

  async consultarCPF(cpf) {
    const hospedeBD = new HospedeBD();
    const hospedes = await hospedeBD.consultarCPf(cpf);
    return hospedes;
  }
}
