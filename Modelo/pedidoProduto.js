import PedidoProdutosBD from "../Persistencia/PedidoProdutosBD.js";

export default class pedidoProdutos {
    #codPedido; //# define que um atributo seja privado 
    #codFornecedor; //# define que um atributo seja privado  
    #razaoSocial;
    #dataCompra;
    
  
    //método construtor que define as informações necessárias para se criar um cliente
    constructor(
      codPedido,
      codFornecedor,  
      razaoSocial,
      dataCompra,   
      
    ) {
      this.#codPedido = codPedido;
      this.#codFornecedor = codFornecedor;   
      this.#razaoSocial = razaoSocial;
      this.#dataCompra = dataCompra;  
    }
  
    get codPedido() {
      return this.#codPedido;
    }

    set codPedido(novoCodPedido){
      this.#codPedido = novoCodPedido;
    }

    get codFornecedor() {
      return this.#codFornecedor;
    }
    
    set codFornecedor(novoCodFornecedor) {
      this.#codFornecedor = novoCodFornecedor;
    }

    get razaoSocial() {
      return this.#razaoSocial;
    }
    
    set razaoSocial(novaRazaoSocial) {
      this.#razaoSocial = novaRazaoSocial;
    }

    get dataCompra(){
      return this.#dataCompra;
    }
  
    set dataCompra(novaDataCompra) {
      this.#dataCompra = novaDataCompra;
    }

    //override ou sobrescrita do método toJSON
    toJSON() {
      return {
        codPedido: this.#codPedido,
        codFornecedor: this.#codFornecedor,
        razaoSocial: this.#razaoSocial,
        dataCompra: this.#dataCompra,
        teste: 123
      };
    }
  
      
    async removerDoBancoDados() {
      const PedidoProdutoBD = new PedidoProdutosBD();
      await PedidoProdutoBD.excluir(this);
    }
  
    async consultar() {
      const PedidoProdutoBD = new PedidoProdutosBD();
      const PedidoProdutos = await PedidoProdutoBD.consultar();
      console.log("pedidoprodutos",PedidoProdutos)
      return PedidoProdutos;
    }
  }