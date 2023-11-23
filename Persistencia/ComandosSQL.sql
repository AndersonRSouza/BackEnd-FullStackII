-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24-Set-2023 às 23:01
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
-- Estrutura da tabela `cadusuario`
--

CREATE TABLE `cadusuario` (
  `codCadUsuario` int(5) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `matricula` int(10) NOT NULL,
  `senha` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(15, 'razao social', 'nome fantasia', 'endereco', 'numer', 'complemento', 'bairro', 'cidade', 'RR', '19400-000', 'pessoa', '11.111.111/1111-11', 'estadual', 'municipal', 'email@email.com', '(11)11111-1111', '(11)1111-1111', 'contato'),
(17, '1', '2', '3', '4', '5', '6', '7', 'AL', '99999-999', '10', '11.111.111/1111-11', '12', '13', '14@email.com', '(15)15151-5151', '(16)1616-1616', 'anderson'),
(18, '2', '3', '4', '5', '6', '7', '8', 'AL', '11111-111', '1', '22.222.222/2222-22', '2222', '22222', '2222@teste.com', '(22)22222-2222', '(22)2222-2222', 'anderson');

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
(62, NULL, '2222-02-22', 10);

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
(62, 3, 1, '10');

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
(10, 'banana nanica', '2.50');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `matricula` int(10) NOT NULL,
  `senha` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cadusuario`
--
ALTER TABLE `cadusuario`
  ADD PRIMARY KEY (`codCadUsuario`);

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
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`codProduto`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`matricula`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadusuario`
--
ALTER TABLE `cadusuario`
  MODIFY `codCadUsuario` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `fornecedor`
--
ALTER TABLE `fornecedor`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `funcionario`
--
ALTER TABLE `funcionario`
  MODIFY `codFuncionario` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedidocompras`
--
ALTER TABLE `pedidocompras`
  MODIFY `codPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `codProduto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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




CREATE TABLE hospede (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  rg VARCHAR(12) NOT NULL,
  telefone VARCHAR(14) NOT NULL,
  email VARCHAR(255) NOT NULL,
  datanasc DATE NOT NULL,
  sexo VARCHAR(10) NOT NULL,
  cep VARCHAR(10) NOT NULL
);

CREATE TABLE acomodacao (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
  num_acom VARCHAR(5) NOT NULL,
  capacidade VARCHAR(10) NOT NULL,
  tamanho VARCHAR(20) NOT NULL,
  localizacao VARCHAR(100) NOT NULL,
  descricao VARCHAR(250) NOT NULL,
  valor VARCHAR(20) NOT NULL
);

CREATE TABLE servico (
  codServico INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(200) NOT NULL,
  valor VARCHAR(20) NOT NULL
);