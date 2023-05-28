// import PedidoCompraBD from "../Persistencia/PedidoCompraBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';

import PedidoComprasBD from "../Persistencia/PedidoComprasBD.js";

export default class PedidoCompras {
  #codPedido; //# define que um atributo seja privado
  #produto;
  #quantidade;
  #dataCompra;
  #fornecedor;

  //método construtor que define as informações necessárias para se criar um cliente
  constructor(
    codPedido,
    produto,
    quantidade,
    dataCompra,
    fornecedor
  ) {
    this.#codPedido = codPedido;
    this.#produto = produto;
    this.#quantidade = quantidade;
    this.#dataCompra = dataCompra;
    this.#fornecedor = fornecedor;
  }

  get codPedido() {
    return this.#codPedido;
  }

  set codPedido(novocodPedido) {
    this.#codPedido = novocodPedido;
  }

  get produto() {
    return this.#produto;
  }

  set produto(novoProduto) {
    if (novoProduto != "")
      //regra de negócio que impede que clientes existam com nomes vazios
      this.#produto = novoProduto;
  }

  get quantidade() {
    return this.#quantidade;
  }

  set quantidade(novaQuantidade) {
    this.#quantidade = novaQuantidade;
  }

  get dataCompra() {
    return this.#dataCompra;
  }

  set dataCompra(novadataCompra) {
    this.#dataCompra = novadataCompra;
  }

  get fornecedor() {
    return this.#fornecedor;
  }

  set fornecedor(novofornecedor) {
    this.#fornecedor = novofornecedor;
  }


  //override ou sobrescrita do método toJSON
  toJSON() {
    return {
      codPedido: this.#codPedido,
      produto: this.#produto,
      quantidade: this.#quantidade,
      dataCompra: this.#dataCompra,
      fornecedor: this.#fornecedor,
    };
  }

  async gravar() {
    const pedidoCompraDAO = new PedidoComprasBD();
    await pedidoCompraDAO.incluir(this);
  }

  async atualizar() {
    const pedidoCompraBD = new PedidoComprasBD();
    await pedidoCompraBD.alterar(this);
  }

  async removerDoBancoDados() {
    const pedidoCompraBD = new PedidoComprasBD();
    await pedidoCompraBD.excluir(this);
  }

  async consultar() {
    const pedidoCompraBD = new PedidoComprasBD();
    const pedidoCompras = await pedidoCompraBD.consultar();
    return pedidoCompras;
  }
}
