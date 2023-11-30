//Nós vamos precisar criar o servidor HTTP
import express from 'express';
import cors from 'cors';
import rotaCliente from './Rotas/rotaCliente.js';
import rotaFornecedor from './Rotas/rotaFornecedor.js';
import rotaCamareira from './Rotas/rotaCamareira.js';
import rotaPedidoCompra from './Rotas/rotaPedidoCompras.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rotaPedidoProduto from './Rotas/rotaPedidoProduto.js';
import rotaHospede from './Rotas/rotaHospede.js';
import rotaAcomodacao from './Rotas/rotaAcomodacao.js';
import rotaServico from './Rotas/rotaServico.js';
import rotaUsuario from './Rotas/rotaUsuario.js';
import rotaPerfil from './Rotas/rotaPerfil.js';
import rotaConsumoProduto from './Rotas/rotaConsumoProduto.js';
import rotaConsumoProdutoPedido from './Rotas/rotaConsumoProdutoPedido.js';
import rotaConsumoServico from './Rotas/rotaConsumoServico.js';
import rotaConsumoServicoPedido from './Rotas/rotaConsumoServicoPedido.js';
// import rotaPerfil from './Rotas/rotaPerfil.js';
// import rotaLogin from './Rotas/rotaLogin.js';
// import rotaUsuario from './Rotas/rotaUsuario.js';



const porta=4000;
const hostname='localhost';

const app = express();

app.use(cors({origin:"*"}));



app.use(express.json());
// app.use('/login', rotaLogin);
// app.use('/perfil', rotaPerfil);
// app.use('/usuario', rotaUsuario)
app.use('/autenticar', rotaUsuario)
app.use('/perfil', rotaPerfil);
app.use('/usuarios', rotaUsuario);
app.use('/pedidocompras', rotaPedidoCompra);
app.use('/clientes', rotaCliente);
app.use('/fornecedor', rotaFornecedor);
app.use('/hospede', rotaHospede);
app.use('/acomodacao', rotaAcomodacao);
app.use('/servico', rotaServico);
app.use('/camareiras', rotaCamareira);
app.use('/produto', rotaProduto);
app.use('/pedidoproduto', rotaPedidoProduto);
app.use('/consumoproduto', rotaConsumoProduto);
app.use('/consumoprodutopedido', rotaConsumoProdutoPedido);
app.use('/consumoservico', rotaConsumoServico);
app.use('/consumoservicopedido', rotaConsumoServicoPedido);


app.listen(porta,hostname, ()=>{
    console.log('Servidor em execução em http://'+hostname+":"+porta);
});