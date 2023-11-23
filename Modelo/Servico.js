
import ServicosBD from "../Persistencia/ServicoBD.js";

export default class Servicos{
    #codServico;
    #descricao;
    #valor;

    constructor(codServico, descricao, valor){
        this.#codServico = codServico;
        this.#descricao = descricao;
        this.#valor = valor;
        
    }

    get codServico() {
        return this.#codServico;
    }

    set codServico(novoCodServico){
        if(novoCodServico !="")
        this.#codServico = novoCodServico;
    }

    get descricao(){
        return this.#descricao;    
    }
    
    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get valor(){
        return this.#valor;
    }

    set valor(novoValor){
        this.#valor = novoValor;
    }

    
    
    //override ou sobrescrita do método toJSON
    toJSON(){
        return {
           
            codServico    : this.#codServico,
            descricao     : this.#descricao,
            valor         : this.#valor,
        }
    }

    async gravar(){
        const servicoDAO = new ServicosBD();
        await servicoDAO.incluir(this);
    }

    async atualizar() {
        const servicoBD = new ServicosBD();
        await servicoBD.alterar(this);
    }

    async removerDoBancoDados() {
        const servicoBD = new ServicosBD();
        await servicoBD.excluir(this);
    }

    async consultar(termo){
        const servicoBD = new ServicosBD();
        const servicos = await servicoBD.consultar(termo);
        return servicos;
    }

    async consultarCODIGO(codigo){
        const servicoBD = new ServicosBD();
        const servicos = await servicoBD.consultarCODIGO(codigo);
        return servicos;
    }
}