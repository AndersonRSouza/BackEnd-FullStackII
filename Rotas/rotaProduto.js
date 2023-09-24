import { Router } from "express";
import ProdutosCTRL from "../Controle/produtoCTRL.js";


const rotaProduto = new Router();
const controladorProduto = new ProdutosCTRL();
//http://dominio:porta/pedidocompras
//requisição e resposta são parâmetros passados automaticamente
// para os métodos da camada de controle

//De forma explícita conseguimos enxergar a interface da API
rotaProduto.get('/',controladorProduto.consultar)
// .get('/:cnpj',controladorPedidoCompra.consultarCNPJ)
.post('/',controladorProduto.gravar)
// .put('/',controladorPedidoCompra.atualizar)
// .delete('/',controladorPedidoCompra.excluir);

export default rotaProduto;