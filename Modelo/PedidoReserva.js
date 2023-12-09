// import PedidoCompraBD from "../Persistencia/PedidoCompraBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';

import PedidoReservasBD from "../Persistencia/PedidoReservasBD.js";

export default class PedidoReservas {
  #codPedido; //# define que um atributo seja privado
  // #codFornecedor; //# define que um atributo seja privado
  // #razaoSocial;
  #dataReserva;
  #total;
  #hospede;
  #listaAcomodacoes;


  //método construtor que define as informações necessárias para se criar um cliente
  constructor(codPedido, dataReserva, total, hospede, listaAcomodacoes) {
    this.#codPedido = codPedido;
    // this.#codFornecedor = codFornecedor;
    // this.#razaoSocial = razaoSocial;
    this.#dataReserva = dataReserva;
    this.#total = total;
    this.#hospede = hospede;
    this.#listaAcomodacoes = listaAcomodacoes;
  }

  

  get codPedido() {
    return this.#codPedido;
  }

  set codPedido(novoCodPedido) {
    this.#codPedido = novoCodPedido;
  }

  get dataReserva() {
    return this.#dataReserva;
  }

  set dataReserva(novaDataReserva) {
    this.#dataReserva = novaDataReserva;
  }

  get total() {
    return this.#total;
  }

  set total(novoTotal) {
    this.#total = novoTotal;
  }

  get hospede() {
    return this.#hospede;
  }

  set hospede(novoHospede) {
    this.#hospede = novoHospede;
  }

  get listaAcomodacoes() {
    return this.#listaAcomodacoes;
  }

  set listaAcomodacoes(novaListaAcomodacoes) {
    this.#listaAcomodacoes = novaListaAcomodacoes;
  }

  // Método toJSON
  toJSON() {
    return {
      codPedido: this.#codPedido,
      dataReserva: this.#dataReserva,
      total: this.#total,
      hospede: this.#hospede,
      listaAcomodacoes: this.#listaAcomodacoes,
    };
  }

  async gravar() {
    const pedidoReservaDAO = new PedidoReservasBD();
    await pedidoReservaDAO.incluir(this);
  }

  async atualizar() {
    const pedidoReservaDAO = new PedidoReservasBD();
    await pedidoReservaDAO.alterar(this);
  }

  async removerDoBancoDados() {
    const pedidoReservaDAO = new PedidoReservasBD();
    await pedidoReservaDAO.excluir(this);
  }

  async consultar() {
    const pedidoReservaDAO = new PedidoReservasBD();
    const reservas = await pedidoReservaDAO.consultar();
    return reservas;
  }

  async removerItensDoBancoDados(){
    const pedidoReservaDAO  = new PedidoReservasBD();
    await pedidoReservaDAO .excluirPedidoAcomodacao(this.#codPedido);
  }
}