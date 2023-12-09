import PedidoAcomodacoesBD from "../Persistencia/PedidoAcomodacaoBD.js";

export default class pedidoAcomodacoes {
    #codPedido; //# define que um atributo seja privado 
    #codHospede; //# define que um atributo seja privado  
    #nome;
    #dataReserva;
    
  
    //método construtor que define as informações necessárias para se criar um cliente
    constructor(
      codPedido,
      codHospede,  
      nome,
      dataReserva,   
      
    ) {
      this.#codPedido = codPedido;
      this.#codHospede = codHospede;   
      this.#nome = nome;
      this.#dataReserva = dataReserva;  
    }
  
    get codPedido() {
        return this.#codPedido;
      }
    
      set codPedido(novoCodPedido) {
        this.#codPedido = novoCodPedido;
      }
    
      get codHospede() {
        return this.#codHospede;
      }
    
      set codHospede(novoCodHospede) {
        this.#codHospede = novoCodHospede;
      }
    
      get nome() {
        return this.#nome;
      }
    
      set nome(novoNome) {
        this.#nome = novoNome;
      }
    
      get dataReserva() {
        return this.#dataReserva;
      }
    
      set dataReserva(novaDataReserva) {
        this.#dataReserva = novaDataReserva;
      }
    
      // Método toJSON
      toJSON() {
        return {
          codPedido: this.#codPedido,
          codHospede: this.#codHospede,
          nome: this.#nome,
          dataReserva: this.#dataReserva,
          teste: 123
        };
    }
    
    async removerDoBancoDados() {
      const PedidoAcomodacaoBD = new PedidoAcomodacoesBD();
      await PedidoAcomodacaoBD.excluir(this);
    }
  
    async consultar() {
      const PedidoAcomodacaoBD = new PedidoAcomodacoesBD();
      const PedidoAcomodacoes = await PedidoAcomodacaoBD.consultar();
      console.log("pedidoacomodacoes",PedidoAcomodacoes)
      return PedidoAcomodacoes;
    }
  }