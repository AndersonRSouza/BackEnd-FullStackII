import Produto from '../Modelo/Produto.js';
import conectar from './Conexao.js';

export default class ProdutoDAO{

    async gravar(produto){
        if (produto instanceof Produto){
            const conexao = await conectar();
            const sql = "INSERT INTO produto(descricao,precoCusto,precoVenda,qtdEstoque) VALUES(?,?,?,?)";
            const parametros = [produto.descricao, 
                                produto.precoCusto,
                                produto.precoVenda,
                                produto.qtdEstoque ];
            const resultado = await conexao.query(sql,parametros);
            return await resultado[0].insertId; //recuperar o id gerado pelo banco de dados
        }
    }
}