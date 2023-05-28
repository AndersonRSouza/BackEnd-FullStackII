import Cliente from '../Modelo/Cliente.js';
import conectar from './Conexao.js';

export default class ClienteBD{

    async incluir(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="INSERT INTO cliente(cpf,nome,sobrenome,usuario,cidade, \
                                           uf,cep) \
                                           VALUES(?,?,?,?,?,?,?)";
            const valores = [cliente.cpf,cliente.nome,cliente.sobrenome, 
                             cliente.usuario, cliente.cidade, cliente.uf,
                             cliente.cep];                                        
            await conexao.query(sql,valores);
        }

    }

    async alterar(cliente){
        
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="UPDATE cliente SET nome=?, sobrenome = ?, usuario = ?, \
                                      cidade = ?, uf = ?,cep = ? \
                       WHERE cpf=?";
            const valores = [cliente.nome,cliente.sobrenome, 
                             cliente.usuario, cliente.cidade, cliente.uf,
                             cliente.cep, cliente.cpf];                                        
            await conexao.query(sql,valores);
        }
    }

    async excluir(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="DELETE FROM cliente WHERE cpf=?";
            const valores = [cliente.cpf];                                        
            await conexao.query(sql,valores);
        } 

    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM cliente WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaClientes = [];
        for(const row of rows){
            const cliente = new Cliente(row['cpf'],row['nome'],
            row['sobrenome'],row['usuario'],row['cidade'],row['uf'], 
            row['cep']);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }

    async consultarCPF(cpf){
        const conexao = await conectar();
        const sql = "SELECT * FROM cliente WHERE cpf = ?";
        const valores = [cpf]
        const [rows] = await conexao.query(sql, valores);
        const listaClientes = [];
        for(const row of rows){
            const cliente = new Cliente(row['cpf'],row['nome'],
            row['sobrenome'],row['usuario'],row['cidade'],row['uf'], 
            row['cep']);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}