//Nós vamos precisar criar o servidor HTTP
import express from 'express';
import cors from 'cors';
import rotaCliente from './Rotas/rotaCliente.js';
import rotaFornecedor from './Rotas/rotaFornecedor.js';
import rotaCamareira from './Rotas/rotaCamareira.js';
import rotaPedidoCompra from './Rotas/rotaPedidoCompras.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rotaPedidoProduto from './Rotas/rotaPedidoProduto.js';

const porta=4000;
const hostname='localhost';

const app = express();

app.use(cors({origin:"*"}));



app.use(express.json());
app.use('/pedidocompras', rotaPedidoCompra)
app.use('/clientes', rotaCliente);
app.use('/fornecedor', rotaFornecedor);
app.use('/camareiras', rotaCamareira);
app.use('/produto', rotaProduto);
app.use('/pedidoproduto', rotaPedidoProduto);


app.listen(porta,hostname, ()=>{
    console.log('Servidor em execução em http://'+hostname+":"+porta);
});