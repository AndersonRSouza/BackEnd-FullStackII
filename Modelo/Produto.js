import ProdutoDAO from "../Persistencia/ProdutoDAO.js";

export default class Produto{

    #id
    #descricao
    #precoCusto
    #precoVenda
    #qtdEstoque

    constructor(id=0, descricao="",precoCusto=0,precoVenda=0,qtdEstoque=0)
    {
        this.#id = id;
        this.#descricao = descricao;
        this.#precoCusto = precoCusto;
        this.#precoVenda = precoVenda;
        this.#qtdEstoque = qtdEstoque;
    }

    get id(){
        return this.#id;
    }
    set id(novoID){
        this.#id = novoID;
    }

    get descricao(){
        return this.#descricao;
    }
    set descricao(novaDesc){
        this.#descricao = novaDesc;
    }


    get precoCusto(){
        return this.#precoCusto;
    }
    set precoCusto(novoPrecoCusto){
        this.#precoCusto = novoPrecoCusto;
    }

    get precoVenda(){
        return this.#precoVenda;
    }
    set precoVenda(novoPrecoVenda){
        this.#precoVenda = novoPrecoVenda;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }
    set qtdEstoque(novaQtdEstoque){
        this.#qtdEstoque = novaQtdEstoque;
    }

    //override do método toJSON da classe pai (object)
    toJSON(){
        return {
                  "id":this.#id,
                  "descricao":this.#descricao,
                  "precoCusto":this.#precoCusto,
                  "precoVenda":this.#precoVenda,
                  "qtdEstoque":this.#qtdEstoque
               }
    }

    async gravar(){
        //Data Access Object
        //Objeto de acesso aos dados
        const prodDAO = new ProdutoDAO();
        this.#id = await prodDAO.gravar(this);
    }

    async atualizar(){

    }

    async excluir(){

    }

    async consultar(){

    }

    async consultarID(){

    }

}