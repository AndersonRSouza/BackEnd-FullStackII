import FornecedorBD from "../Persistencia/FornecedorBD.js";
// import FornecedorBD from "../Persistencia/FornecedorBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';

export default class Fornecedor {
  #codigo; //# define que um atributo seja privado
  #razaoSocial;
  #nomeFantasia;
  #endereco;
  #numero;
  #complemento;
  #bairro;
  #cidade;
  #uf;
  #cep;
  #pessoa;
  #cnpj;
  #estadual;
  #municipal;
  #email;
  #celular;
  #telefone;
  #contato;

  //método construtor que define as informações necessárias para se criar um cliente
  constructor(
    codigo,
    razaoSocial,
    nomeFantasia,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    cep,
    pessoa,
    cnpj,
    estadual,
    municipal,
    email,
    celular,
    telefone,
    contato
  ) {
    this.#codigo = codigo;
    this.#razaoSocial = razaoSocial;
    this.#nomeFantasia = nomeFantasia;
    this.#endereco = endereco;
    this.#numero = numero;
    this.#complemento = complemento;
    this.#bairro = bairro;
    this.#cidade = cidade;
    this.#uf = uf;
    this.#cep = cep;
    this.#pessoa = pessoa;
    this.#cnpj = cnpj;
    this.#estadual = estadual;
    this.#municipal = municipal;
    this.#email = email;
    this.#celular = celular;
    this.#telefone = telefone;
    this.#contato = contato;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
  }

  get razaoSocial() {
    return this.#razaoSocial;
  }

  set razaoSocial(novoRazaoSocial) {
    if (typeof novoRazaoSocial === 'string')
      this.#razaoSocial = novoRazaoSocial;
    else
      throw new Error("A razão social deve ser uma string válida.");
  }
  

  get nomeFantasia() {
    return this.#nomeFantasia;
  }

  set nomeFantasia(novoNomeFantasia) {
    this.#nomeFantasia = novoNomeFantasia;
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(novoEndereco) {
    this.#endereco = novoEndereco;
  }

  get numero() {
    return this.#numero;
  }

  set numero(novoNumero) {
    this.#numero = novoNumero;
  }

  get complemento() {
    return this.#complemento;
  }

  set complemento(novoComplemento) {
    this.#complemento = novoComplemento;
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

  get cep() {
    return this.#cep;
  }

  set cep(novoCep) {
    this.#cep = novoCep;
  }

  get pessoa() {
    return this.#pessoa;
  }

  set pessoa(novaPessoa) {
    this.#pessoa = novaPessoa;
  }

  get cnpj() {
    return this.#cnpj;
  }

  set cnpj(novoCnpj) {
    this.#cnpj = novoCnpj;
  }

  get estadual() {
    return this.#estadual;
  }

  set estadual(novaEstadual) {
    this.#estadual = novaEstadual;
  }

  get municipal() {
    return this.#municipal;
  }

  set municipal(novoMunicipal) {
    this.#municipal = novoMunicipal;
  }
  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }
  get celular() {
    return this.#celular;
  }

  set celular(novoCelular) {
    this.#celular = novoCelular;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  get contato() {
    return this.#contato;
  }

  set contato(novoContato) {
    this.#contato = novoContato;
  }

  //override ou sobrescrita do método toJSON
  toJSON() {
    return {
      codigo: this.#codigo,
      razaoSocial: this.#razaoSocial,
      nomeFantasia: this.#nomeFantasia,
      endereco: this.#endereco,
      numero: this.#cidade,
      complemento: this.#complemento,
      bairro: this.#bairro,
      cidade: this.#cidade,
      uf: this.#uf,
      cep: this.#cep,
      pessoa: this.#pessoa,
      cnpj: this.#cnpj,
      estadual: this.#estadual,
      municipal: this.#municipal,
      email: this.#email,
      celular: this.#celular,
      telefone: this.#telefone,
      contato: this.#contato,
    };
  }

  async gravar() {
    const fornecedorDAO = new FornecedorBD();
    await fornecedorDAO.incluir(this);
  }

  async atualizar() {
    const fornecedorBD = new FornecedorBD();
    await fornecedorBD.alterar(this);
  }

  async removerDoBancoDados() {
    const fornecedorBD = new FornecedorBD();
    await fornecedorBD.excluir(this);
  }

  async removerItensDoBancoDados() {
    const fornecedorBD = new FornecedorBD();
    await fornecedorBD.excluirFornecedor(this.#codigo);
  }

  async consultar(termo) {
    const fornecedorBD = new FornecedorBD();
    const fornecedores = await fornecedorBD.consultar(termo);
    return fornecedores;
  }

  async consultarCNPJ(cpf) {
    const fornecedorBD = new FornecedorBD();
    const fornecedores = await fornecedorBD.consultarCNPJ(cpf);
    return fornecedores;
  }
}
