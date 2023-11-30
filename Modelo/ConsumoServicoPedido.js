import ConsumoServicoPedidosBD from "../Persistencia/ConsumoServicosPedidosBD.js";

export default class consumoServicoPedidos {
    #codConsumoServico; //# define que um atributo seja privado 
    #codHospedeConsumoServico; //# define que um atributo seja privado  
    #nome;
    #dataServico;
    
  
    //método construtor que define as informações necessárias para se criar um cliente
    constructor(
      codConsumoServico,
      codHospedeConsumoServico,  
      nome,
      dataServico,   
      
    ) {
      this.#codConsumoServico = codConsumoServico;
      this.#codHospedeConsumoServico = codHospedeConsumoServico;   
      this.#nome = nome;
      this.#dataServico = dataServico;  
    }
  
    get codConsumoServico() {
      return this.#codConsumoServico;
    }

    set codConsumoServico(novoCodConsumoServico){
      this.#codConsumoServico = novoCodConsumoServico;
    }

    get codHospedeConsumoServico() {
      return this.#codHospedeConsumoServico;
    }
    
    set codHospedeConsumoServico(novoCodHospedeConsumoServico) {
      this.#codHospedeConsumoServico = novoCodHospedeConsumoServico;
    }

    get nome() {
      return this.#nome;
    }
    
    set nome(novaNome) {
      this.#nome = novaNome;
    }

    get dataServico(){
      return this.#dataServico;
    }
  
    set dataServico(novaDataServico) {
      this.#dataServico = novaDataServico;
    }

    //override ou sobrescrita do método toJSON
    toJSON() {
      return {
        codConsumoServico: this.#codConsumoServico,
        codHospedeConsumoServico: this.#codHospedeConsumoServico,
        nome: this.#nome,
        dataServico: this.#dataServico,
        teste: 123
      };
    }
  
      
    async removerDoBancoDados() {
      const ConsumoServicoPedidoBD = new ConsumoServicoPedidosBD();
      await ConsumoServicoPedidoBD.excluir(this);
    }
  
    async consultar() {
      const ConsumoServicoPedidoBD = new ConsumoServicoPedidosBD();
      const ConsumoServicoPedidos = await ConsumoServicoPedidoBD.consultar();
      console.log("pedidoprodutos",ConsumoServicoPedidos)
      return ConsumoServicoPedidos;
    }
  }