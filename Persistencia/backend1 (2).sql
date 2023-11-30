-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Nov-2023 às 00:36
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `backend1`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `acomodacao`
--

CREATE TABLE `acomodacao` (
  `codigo` int(11) NOT NULL,
  `num_acom` varchar(5) NOT NULL,
  `capacidade` varchar(10) NOT NULL,
  `tamanho` varchar(20) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  `descricao` varchar(250) NOT NULL,
  `valor` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `acomodacao`
--

INSERT INTO `acomodacao` (`codigo`, `num_acom`, `capacidade`, `tamanho`, `localizacao`, `descricao`, `valor`) VALUES
(1, '3', '4', 'grande', 'frente piscina', 'com banheira', '100,00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor`
--

CREATE TABLE `fornecedor` (
  `codigo` int(5) NOT NULL,
  `razaoSocial` varchar(100) NOT NULL,
  `nomeFantasia` varchar(100) NOT NULL,
  `endereco` varchar(65) NOT NULL,
  `numero` varchar(5) NOT NULL,
  `complemento` varchar(20) NOT NULL,
  `bairro` varchar(30) NOT NULL,
  `cidade` varchar(35) NOT NULL,
  `uf` varchar(3) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `pessoa` varchar(15) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `estadual` varchar(12) NOT NULL,
  `municipal` varchar(12) NOT NULL,
  `email` varchar(40) NOT NULL,
  `celular` varchar(18) NOT NULL,
  `telefone` varchar(18) NOT NULL,
  `contato` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fornecedor`
--

INSERT INTO `fornecedor` (`codigo`, `razaoSocial`, `nomeFantasia`, `endereco`, `numero`, `complemento`, `bairro`, `cidade`, `uf`, `cep`, `pessoa`, `cnpj`, `estadual`, `municipal`, `email`, `celular`, `telefone`, `contato`) VALUES
(10, 'coperalcool', 'coperalcool', 'teste', '12', '12', '12', '12', 'AC', '1111', 'Jurídica', '1111', '1111', '111', '123123@teste.com', '111111', '11111', 'anderson'),
(18, '2123', '3', '4', '8', '6', '7', '8', 'AL', '11111-111', '1', '22.222.222/2222-22', '2222', '22222', '2222@teste.com', '(22)22222-2222', '(22)2222-2222', 'anderson'),
(20, 'anderson verduras', 'anderson verduras', 'av das verduras', 'vence', 'casa', 'centro', 'venceslau', 'SP', '19400-000', 'fisica', '11.111.111/1111-11', '111111', '111111', '11111@teste.com', '(11)11111-1111', '(11)1111-1111', 'anderson'),
(21, 'teste 27/11', '26/11', '26/11', '26/11', '26/11', '26/11', '26/11', 'AC', '11111-111', 'fisica', '11.111.111/1111-11', '11111', '111111', '111111@teste.com', '(11)11111-1111', '(11)1111-1111', '26/11');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionario`
--

CREATE TABLE `funcionario` (
  `codFuncionario` int(10) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `dataNasc` varchar(25) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefone` varchar(18) NOT NULL,
  `cidade` varchar(150) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `matricula` int(11) NOT NULL,
  `departamento` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `hospede`
--

CREATE TABLE `hospede` (
  `cod_hosp` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(14) NOT NULL,
  `endereco` VARCHAR(255) NOT NULL,
  `rg` VARCHAR(12) NOT NULL,
  `telefone` VARCHAR(14) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `datanasc` VARCHAR(10) NOT NULL,
  `sexo` VARCHAR(10) NOT NULL,
  `cep` VARCHAR(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `hospede` (`cod_hosp`, `nome`, `cpf`, `endereco`, `rg`, `telefone`, `email`, `datanasc`, `sexo`, `cep`) VALUES
  (10, 'HEITOR', '33311122245', 'rua das amoras', '45555', '5555555', 'he@as.com', '10/05/2000', 'masculino', '19400222' );

--
-- Extraindo dados da tabela `hospede`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidocompras`
--

CREATE TABLE `pedidocompras` (
  `codPedido` int(11) NOT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `dataCompra` varchar(15) DEFAULT NULL,
  `codFornecedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedidocompras`
--

INSERT INTO `pedidocompras` (`codPedido`, `quantidade`, `dataCompra`, `codFornecedor`) VALUES
(62, NULL, '2222-02-22', 10),
(65, NULL, '2222-02-22', 10),
(66, NULL, '1111-11-11', 10),
(67, NULL, '2222-02-22', 10),
(69, NULL, '2023-06-25', 10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido_produtos`
--

CREATE TABLE `pedido_produtos` (
  `codPedido` int(11) NOT NULL,
  `codProduto` int(11) NOT NULL,
  `qtd` int(11) DEFAULT NULL,
  `preco` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedido_produtos`
--

INSERT INTO `pedido_produtos` (`codPedido`, `codProduto`, `qtd`, `preco`) VALUES
(62, 3, 1, '10'),
(65, 1, 1, '20'),
(66, 8, 1, '4'),
(67, 9, 1, '100'),
(69, 12, 2, '3');

-- --------------------------------------------------------

--
-- Estrutura da tabela `perfil`
--

CREATE TABLE `perfil` (
  `perfil_id` int(11) NOT NULL,
  `descricao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `perfil`
--

INSERT INTO `perfil` (`perfil_id`, `descricao`) VALUES
(1, 'admin'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `codProduto` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `preco` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`codProduto`, `nome`, `preco`) VALUES
(1, 'banana', '19.99'),
(2, 'maçã', '29.99'),
(3, 'abacate', '9.99'),
(4, 'cenoura', '14.99'),
(5, 'banana', '4.60'),
(6, 'unoeste', '6.50'),
(7, 'teste', '8.50'),
(8, 'macarrão', '3.75'),
(9, 'andersonteste', '100.00'),
(10, 'banana nanica', '2.50'),
(11, 'produto teste', '2'),
(12, 'produto teste', '2.50'),
(13, 'produto novo', '2.50'),
(14, 'teste 2', '3.50');

-- --------------------------------------------------------

--
-- Estrutura da tabela `servico`
--

CREATE TABLE `servico` (
  `codServico` int(11) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `valor` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `servico`
--

INSERT INTO `servico` (`codServico`, `descricao`, `valor`) VALUES
(1, 'passar roupa', '10,00'),
(2, 'lavar roupa', '20.00'),
(3, 'lavar carro', '50.00'),
(5, 'passear com o cachorro', '20.00'),
(6, 'dar banho cachorro', '40.00'),
(7, 'limpar quarto', '20.00'),
(8, 'lavar sapato', '20.00'),
(9, 'engraxar sapato', '20.00'),
(10, 'buscar encomenda', '20.00');
-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `codUsuario` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `perfil` varchar(25) DEFAULT NULL,
  `datacadastro` varchar(30) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`codUsuario`, `nome`, `perfil`, `datacadastro`, `senha`) VALUES
(3, 'anderson', 'Administrador', '2023-11-27', '1234'),
(4, 'Anderson', 'Administrador', '27/11/2023', 'anderson123');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `acomodacao`
--
ALTER TABLE `acomodacao`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices para tabela `fornecedor`
--
ALTER TABLE `fornecedor`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices para tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`codFuncionario`);

--
-- Índices para tabela `hospede`
--
ALTER TABLE `hospede`
  ADD PRIMARY KEY (`cod_hosp`);

--
-- Índices para tabela `pedidocompras`
--
ALTER TABLE `pedidocompras`
  ADD PRIMARY KEY (`codPedido`),
  ADD KEY `codFornecedor` (`codFornecedor`);

--
-- Índices para tabela `pedido_produtos`
--
ALTER TABLE `pedido_produtos`
  ADD PRIMARY KEY (`codPedido`,`codProduto`),
  ADD KEY `codProduto` (`codProduto`);

--
-- Índices para tabela `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`perfil_id`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`codProduto`);

--
-- Índices para tabela `servico`
--
ALTER TABLE `servico`
  ADD PRIMARY KEY (`codServico`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codUsuario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acomodacao`
--
ALTER TABLE `acomodacao`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `fornecedor`
--
ALTER TABLE `fornecedor`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `funcionario`
--
ALTER TABLE `funcionario`
  MODIFY `codFuncionario` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `hospede`
--
ALTER TABLE `hospede`
  MODIFY `cod_hosp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `pedidocompras`
--
ALTER TABLE `pedidocompras`
  MODIFY `codPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `codProduto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `servico`
--
ALTER TABLE `servico`
  MODIFY `codServico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `codUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `pedidocompras`
--
ALTER TABLE `pedidocompras`
  ADD CONSTRAINT `pedidocompras_ibfk_1` FOREIGN KEY (`codFornecedor`) REFERENCES `fornecedor` (`codigo`);

--
-- Limitadores para a tabela `pedido_produtos`
--
ALTER TABLE `pedido_produtos`
  ADD CONSTRAINT `pedido_produtos_ibfk_1` FOREIGN KEY (`codPedido`) REFERENCES `pedidocompras` (`codPedido`),
  ADD CONSTRAINT `pedido_produtos_ibfk_2` FOREIGN KEY (`codProduto`) REFERENCES `produto` (`codProduto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
CREATE TABLE acomodacao (
  cod_acom INT AUTO_INCREMENT PRIMARY KEY,
  num_acom VARCHAR(5) NOT NULL,
  capacidade VARCHAR(10) NOT NULL,
  tamanho VARCHAR(20) NOT NULL,
  localizacao VARCHAR(100) NOT NULL,
  descricao VARCHAR(250) NOT NULL,
  valor VARCHAR(20) NOT NULL
);ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `consumo_produto` (
  `codConsumoProduto` int(11) NOT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `dataCompra` varchar(15) DEFAULT NULL,
  `codHospedeConsumo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `consumo_produto` (`codConsumoProduto`, `quantidade`, `dataCompra`, `codHospedeConsumo`) VALUES
(62, NULL, '2222-02-22', 10);



CREATE TABLE `consumo_produto_pedido` (
  `codConsumoProduto` int(11) NOT NULL,
  `codProduto` int(11) NOT NULL,
  `qtd` int(11) DEFAULT NULL,
  `preco` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `consumo_produto_pedido` (`codConsumoProduto`, `codProduto`, `qtd`, `preco`) VALUES
(62, 3, 1, '10');


ALTER TABLE `consumo_produto`
  ADD PRIMARY KEY (`codConsumoProduto`),
  ADD KEY `codHospedeConsumo` (`codHospedeConsumo`);

ALTER TABLE `consumo_produto`
  MODIFY `codConsumoProduto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;


ALTER TABLE `consumo_produto_pedido`
  ADD PRIMARY KEY (`codConsumoProduto`,`codProduto`),
  ADD KEY `codProduto` (`codProduto`);

ALTER TABLE `consumo_produto_pedido`
  MODIFY `codConsumoProduto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

ALTER TABLE `consumo_produto`
  ADD CONSTRAINT `consumo_produto_ibfk_1` FOREIGN KEY (`codHospedeConsumo`) REFERENCES `hospede` (`cod_hosp`);


ALTER TABLE `consumo_produto_pedido`
  ADD CONSTRAINT `consumo_produto_pedido_ibfk_1` FOREIGN KEY (`codConsumoProduto`) REFERENCES `consumo_produto` (`codConsumoProduto`),
  ADD CONSTRAINT `consumo_produto_pedido_ibfk_2` FOREIGN KEY (`codProduto`) REFERENCES `produto` (`codProduto`);
COMMIT;

CREATE TABLE `consumo_servico` (
  `codConsumoServico` int(11) NOT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `dataServico` varchar(15) DEFAULT NULL,
  `codHospedeConsumoServico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `consumo_servico` (`codConsumoServico`, `quantidade`, `dataServico`, `codHospedeConsumoServico`) VALUES
(62, NULL, '2222-02-22', 10);


CREATE TABLE `consumo_servico_pedido` (
  `codConsumoServico` int(11) NOT NULL,
  `codServico` int(11) NOT NULL,
  `qtd` int(11) DEFAULT NULL,
  `valor` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `consumo_servico_pedido` (`codConsumoServico`, `codServico`, `qtd`, `valor`) VALUES
(62, 3, 1, '10');

ALTER TABLE `consumo_servico`
  ADD PRIMARY KEY (`codConsumoServico`),
  ADD KEY `codHospedeConsumoServico` (`codHospedeConsumoServico`);

ALTER TABLE `consumo_servico`
  MODIFY `codConsumoServico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

ALTER TABLE `consumo_servico_pedido`
  ADD PRIMARY KEY (`codConsumoServico`,`codServico`),
  ADD KEY `codServico` (`codServico`);

ALTER TABLE `consumo_servico_pedido`
  MODIFY `codConsumoServico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

ALTER TABLE `consumo_servico`
  ADD CONSTRAINT `consumo_servico_ibfk_1` FOREIGN KEY (`codHospedeConsumoServico`) REFERENCES `hospede` (`cod_hosp`);


ALTER TABLE `consumo_servico_pedido`
  ADD CONSTRAINT `consumo_servico_pedido_ibfk_1` FOREIGN KEY (`codConsumoServico`) REFERENCES `consumo_servico` (`codConsumoServico`),
  ADD CONSTRAINT `consumo_servico_pedido_ibfk_2` FOREIGN KEY (`codServico`) REFERENCES `servico` (`codServico`);
COMMIT;


 