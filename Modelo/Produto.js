import ProdutosBD from "../Persistencia/ProdutoBD.js";
export default class Produtos {
    #codProduto; //# define que um atributo seja privado
    #nome;
    #preco;
  
    //método construtor que define as informações necessárias para se criar um cliente
    constructor(
      codProduto,
      nome,
      preco
    ) {
      this.#codProduto = codProduto;
      this.#nome = nome;
      this.#preco = preco;
    }
  
    get codProduto() {
      return this.#codProduto;
    }
  
    set codProduto(novoCodProduto) {
      this.#codProduto = novoCodProduto;
    }
  
    get nome() {
      return this.#nome;
    }
  
    set nome(novoNome) {
        this.#nome = novoNome;
    }
  
    get preco() {
      return this.#preco;
    }
  
    set preco(novoPreco) {
      this.#preco = novoPreco;
    }  
    //override ou sobrescrita do método toJSON
    toJSON() {
      return {
        codProduto: this.#codProduto,
        nome: this.#nome,
        preco: this.#preco,
      };
    }
  
    async gravar() {
      const produtoDAO = new ProdutosBD();
      await produtoDAO.incluir(this);
    }
  
    async atualizar() {
      const produtoBD = new ProdutosBD();
      await produtoBD.alterar(this);
    }
  
    async removerDoBancoDados() {
      const produtoBD = new ProdutosBD();
      await produtoBD.excluir(this);
    }
  
    async consultar() {
      const produtoBD = new ProdutosBD();
      const produtos = await produtoBD.consultar();
      return produtos;
    }
  }
  