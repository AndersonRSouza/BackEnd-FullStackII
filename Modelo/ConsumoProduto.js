// import PedidoCompraBD from "../Persistencia/PedidoCompraBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';

import ConsumoProdutosBD from "../Persistencia/ConsumoProdutosBD.js";

export default class ConsumoProdutos {
  #codConsumoProduto; //# define que um atributo seja privado
  // #codHospede; //# define que um atributo seja privado
  // #razaoSocial;
  #dataCompra;
  #total;
  #hospede;
  #listaProdutos;


  //método construtor que define as informações necessárias para se criar um cliente
  constructor(codConsumoProduto, dataCompra, total, hospede, listaProdutos) {
    this.#codConsumoProduto = codConsumoProduto;
    // this.#codHospede = codHospede;
    // this.#razaoSocial = razaoSocial;
    this.#dataCompra = dataCompra;
    this.#total = total;
    this.#hospede = hospede;
    this.#listaProdutos = listaProdutos;
  }

  get codConsumoProduto() {
    return this.#codConsumoProduto;
  }

  set codConsumoProduto(novoCodPedido) {
    this.#codConsumoProduto = novoCodPedido;
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

  get hospede() {
    return this.#hospede;
  }

  set hospede(novoHospede) {
    this.#hospede = novoHospede;
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
      codConsumoProduto: this.#codConsumoProduto,
      dataCompra: this.#dataCompra,
      total:this.#total,
      hospede: this.#hospede,
      listaProdutos: this.#listaProdutos
    };
  }

  async gravar() {
    const consumoProdutoDAO = new ConsumoProdutosBD();
    await consumoProdutoDAO.incluir(this);
  }

  async atualizar() {
    const consumoProdutoBD = new ConsumoProdutosBD();
    await consumoProdutoBD.alterar(this);
  }

  async removerDoBancoDados() {
    const consumoProdutoBD = new ConsumoProdutosBD();
    await consumoProdutoBD.excluir(this);
  }

  async consultar() {
    const consumoProdutoBD = new ConsumoProdutosBD();
    const consumoProdutos = await consumoProdutoBD.consultar();
    return consumoProdutos;
  }
  async removerItensDoBancoDados(){
    const consumoProdutoBD = new ConsumoProdutosBD();
    await consumoProdutoBD.excluirConsumoProdutoPedido(this.#codConsumoProduto);
  }
}
