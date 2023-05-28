import ClienteBD from '../Persistencia/ClienteBD.js';

export default class Cliente{

    #cpf;  //# define que um atributo seja privado
    #nome;
    #sobrenome;
    #usuario;
    #cidade;
    #uf;
    #cep;
    
    //método construtor que define as informações necessárias para se criar um cliente
    constructor(cpf, nome, sobrenome, usuario, cidade, uf, cep){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#usuario = usuario;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if(novoNome != "") //regra de negócio que impede que clientes existam com nomes vazios
            this.#nome = novoNome;
    }

    get sobrenome() {
        return this.#sobrenome;
    }

    set sobrenome(novoSob){
        this.#sobrenome = novoSob;
    }

    get usuario(){
        return this.#usuario;    
    }
    
    set usuario(novoUsuario){
        this.#usuario = novoUsuario;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get uf(){
        return this.#uf;
    }
    
    set uf(novaUf){
        this.#uf=novaUf;
    }

    get cep(){
        return this.#cep;
    }

    set cep(novoCep){
        this.#cep = novoCep;
    }
    
    //override ou sobrescrita do método toJSON
    toJSON(){
        return {
            "cpf"      : this.#cpf,
            "nome"     : this.#nome,
            "sobrenome" : this.#sobrenome,
            "usuario"   : this.#usuario,
            "cidade"   : this.#cidade,
            "uf"       : this.#uf,
            "cep"    : this.#cep
        }
    }

    async gravar(){
        const clienteDAO = new ClienteBD();
        await clienteDAO.incluir(this);
    }

    async atualizar() {
        const clienteBD = new ClienteBD();
        await clienteBD.alterar(this);
    }

    async removerDoBancoDados() {
        const clienteBD = new ClienteBD();
        await clienteBD.excluir(this);
    }

    async consultar(termo){
        const clienteBD = new ClienteBD();
        const clientes = await clienteBD.consultar(termo);
        return clientes;
    }

    async consultarCPF(cpf){
        const clienteBD = new ClienteBD();
        const clientes = await clienteBD.consultarCPF(cpf);
        return clientes;
    }
}