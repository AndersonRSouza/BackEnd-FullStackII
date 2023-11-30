import ConsumoProdutoPedidosBD from "../Persistencia/ConsumoProdutosPedidosBD.js";

export default class consumoProdutoPedidos {
    #codConsumoProduto; //# define que um atributo seja privado 
    #codHospedeConsumo; //# define que um atributo seja privado  
    #nome;
    #dataCompra;
    
  
    //método construtor que define as informações necessárias para se criar um cliente
    constructor(
      codConsumoProduto,
      codHospedeConsumo,  
      nome,
      dataCompra,   
      
    ) {
      this.#codConsumoProduto = codConsumoProduto;
      this.#codHospedeConsumo = codHospedeConsumo;   
      this.#nome = nome;
      this.#dataCompra = dataCompra;  
    }
  
    get codConsumoProduto() {
      return this.#codConsumoProduto;
    }

    set codConsumoProduto(novoCodConsumoProduto){
      this.#codConsumoProduto = novoCodConsumoProduto;
    }

    get codHospedeConsumo() {
      return this.#codHospedeConsumo;
    }
    
    set codHospedeConsumo(novoCodHospedeConsumo) {
      this.#codHospedeConsumo = novoCodHospedeConsumo;
    }

    get nome() {
      return this.#nome;
    }
    
    set nome(novaNome) {
      this.#nome = novaNome;
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
        codConsumoProduto: this.#codConsumoProduto,
        codHospedeConsumo: this.#codHospedeConsumo,
        nome: this.#nome,
        dataCompra: this.#dataCompra,
        teste: 123
      };
    }
  
      
    async removerDoBancoDados() {
      const ConsumoProdutoPedidoBD = new ConsumoProdutoPedidosBD();
      await ConsumoProdutoPedidoBD.excluir(this);
    }
  
    async consultar() {
      const ConsumoProdutoPedidoBD = new ConsumoProdutoPedidosBD();
      const ConsumoProdutoPedidos = await ConsumoProdutoPedidoBD.consultar();
      console.log("pedidoprodutos",ConsumoProdutoPedidos)
      return ConsumoProdutoPedidos;
    }
  }