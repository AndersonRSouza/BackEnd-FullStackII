import AcomodacaoBD from "../Persistencia/AcomodacaoBD.js";
// import FornecedorBD from "../Persistencia/FornecedorBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';

export default class Acomodacao {
    #codigo; //# define que um atributo seja privado
    #num_acom;
    #capacidade;
    #tamanho;
    #localizacao;
    #descricao;
    #valor;

  //método construtor que define as informações necessárias para se criar uma acomodação
  constructor(
    codigo,
    num_acom,
    capacidade,
    tamanho,
    localizacao,
    descricao,
    valor
  ) {
    this.#codigo = codigo;
    this.#num_acom = num_acom;
    this.#capacidade = capacidade;
    this.#tamanho = tamanho;
    this.#localizacao = localizacao;
    this.#descricao = descricao;
    this.#valor = valor;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
  }

  get num_acom() {
    return this.#num_acom;
  }

  set num_acom(novoNumAcom) {
    this.#num_acom = novoNumAcom;
  }

  get capacidade() {
    return this.#capacidade;
  }

  set capacidade(novaCapacidade) {
    this.#capacidade = novaCapacidade;
  }

  get tamanho() {
    return this.#tamanho;
  }

  set tamanho(novoTamanho) {
    this.#tamanho = novoTamanho;
  }

  get localizacao() {
    return this.#localizacao;
  }

  set localizacao(novaLocalizacao) {
    this.#localizacao = novaLocalizacao;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(novaDescricao) {
    this.#descricao = novaDescricao;
  }

  get valor() {
    return this.#valor;
  }

  set valor(novoValor) {
    this.#valor = novoValor;
  }

  //override ou sobrescrita do método toJSON
  toJSON() {
    return {
        codigo: this.#codigo,
        num_acom: this.#num_acom,
        capacidade: this.#capacidade,
        tamanho: this.#tamanho,
        localizacao: this.#localizacao,
        descricao: this.#descricao,
        valor: this.#valor,
    };
   }

  async gravar() {
    const acomodacaoDAO = new AcomodacaoBD();
    await acomodacaoDAO.incluir(this);
  }

  async atualizar() {
    const acomodacaoBD = new AcomodacaoBD();
    await acomodacaoBD.alterar(this);
  }

  async removerItensDoBancoDados() {
    const acomodacaoBD = new AcomodacaoBD();
    await acomodacaoBD.excluir(this);
  }

  async consultar(termo) {
    const acomodacaoBD = new AcomodacaoBD();
    const acomodacoes = await acomodacaoBD.consultar(termo);
    return acomodacoes;
  }

  async consultarCodigo(codigo) {
    const acomodacaoBD = new AcomodacaoBD();
    const acomodacoes = await acomodacaoBD.consultarCodigo(codigo);
    return acomodacoes;
  }
}
