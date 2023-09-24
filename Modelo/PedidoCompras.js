// import PedidoCompraBD from "../Persistencia/PedidoCompraBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';

import PedidoComprasBD from "../Persistencia/PedidoComprasBD.js";

export default class PedidoCompras {
  #codPedido; //# define que um atributo seja privado
  // #codFornecedor; //# define que um atributo seja privado
  // #razaoSocial;
  #dataCompra;
  #total;
  #fornecedor;
  #listaProdutos;


  //método construtor que define as informações necessárias para se criar um cliente
  constructor(codPedido, dataCompra, total, fornecedor, listaProdutos) {
    this.#codPedido = codPedido;
    // this.#codFornecedor = codFornecedor;
    // this.#razaoSocial = razaoSocial;
    this.#dataCompra = dataCompra;
    this.#total = total;
    this.#fornecedor = fornecedor;
    this.#listaProdutos = listaProdutos;
  }

  get codPedido() {
    return this.#codPedido;
  }

  set codPedido(novoCodPedido) {
    this.#codPedido = novoCodPedido;
  }


  get dataCompra() {
    return this.#dataCompra;
  }

  set dataCompra(novaDataCompra) {
    this.#dataCompra = novaDataCompra;
  }
  get total(){
    return this.#total;
  }

  set total(novoTotal){
    this.#total = novoTotal;
  }

  get fornecedor() {
    return this.#fornecedor;
  }

  set fornecedor(novoFornecedor) {
    this.#fornecedor = novoFornecedor;
  }

  get listaProdutos() {
    return this.#listaProdutos;
  }

  set listaProdutos(novoListaProdutos) {
    this.#listaProdutos = novoListaProdutos;
  }




  //override ou sobrescrita do método toJSON
  toJSON() {
    return {
      codPedido: this.#codPedido,
      dataCompra: this.#dataCompra,
      total:this.#total,
      fornecedor: this.#fornecedor,
      listaProdutos: this.#listaProdutos
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
  async removerItensDoBancoDados(){
    const pedidoCompraBD = new PedidoComprasBD();
    await pedidoCompraBD.excluirPedidoProduto(this.#codPedido);
  }
}
