// import PedidoServicoBD from "../Persistencia/PedidoServicoBD.js";
// import ClienteBD from '../Persistencia/ClienteBD.js';
import ConsumoServicosBD from "../Persistencia/ConsumoServicosBD.js";


export default class ConsumoServicos {
  #codConsumoServico; //# define que um atributo seja privado
  // #codHospede; //# define que um atributo seja privado
  // #razaoSocial;
  #dataServico;
  #total;
  #hospede;
  #listaServicos;


  //método construtor que define as informações necessárias para se criar um cliente
  constructor(codConsumoServico, dataServico, total, hospede, listaServicos) {
    this.#codConsumoServico = codConsumoServico;
    // this.#codHospede = codHospede;
    // this.#razaoSocial = razaoSocial;
    this.#dataServico = dataServico;
    this.#total = total;
    this.#hospede = hospede;
    this.#listaServicos = listaServicos;
  }

  get codConsumoServico() {
    return this.#codConsumoServico;
  }

  set codConsumoServico(novoCodPedido) {
    this.#codConsumoServico = novoCodPedido;
  }


  get dataServico() {
    return this.#dataServico;
  }

  set dataServico(novaDataServico) {
    this.#dataServico = novaDataServico;
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

  get listaServicos() {
    return this.#listaServicos;
  }

  set listaServicos(novoListaServicos) {
    this.#listaServicos = novoListaServicos;
  }




  //override ou sobrescrita do método toJSON
  toJSON() {
    return {
      codConsumoServico: this.#codConsumoServico,
      dataServico: this.#dataServico,
      total:this.#total,
      hospede: this.#hospede,
      listaServicos: this.#listaServicos
    };
  }

  async gravar() {
    const consumoServicoDAO = new ConsumoServicosBD();
    await consumoServicoDAO.incluir(this);
  }

  async atualizar() {
    const consumoServicoBD = new ConsumoServicosBD();
    await consumoServicoBD.alterar(this);
  }

  async removerDoBancoDados() {
    const consumoServicoBD = new ConsumoServicosBD();
    await consumoServicoBD.excluir(this);
  }

  async consultar() {
    const consumoServicoBD = new ConsumoServicosBD();
    const consumoServicos = await consumoServicoBD.consultar();
    return consumoServicos;
  }
  async removerItensDoBancoDados(){
    const consumoServicoBD = new ConsumoServicosBD();
    await consumoServicoBD.excluirConsumoServicoPedido(this.#codConsumoServico);
  }
}
