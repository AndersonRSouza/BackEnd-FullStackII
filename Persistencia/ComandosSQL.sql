CREATE TABLE `fornecedor` (
  `codigo` int(5) NOT NULL PRIMARY KEY,
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
);

CREATE TABLE `camareira` (
  `cpf` varchar(16) NOT NULL PRIMARY KEY,
  `nome` varchar(65) NOT NULL,
  `dataNasc` varchar(10) NOT NULL,
  `endereco` varchar(85) NOT NULL,
  `bairro` varchar(35) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `nis` varchar(11) NOT NULL,
  `genero` varchar(20) NOT NULL
);

-- {
--     "codigo":"1",
--     "razaoSocial":"anderson ltda",
--     "nomeFantasia":"anderson ltda",
--     "endereco":"rua das amoras",
--     "numero":"325",
--     "complemento":"casa",
--     "bairro":"centro",
--     "cidade":"presidente venceslau",
--     "uf":"sp",
--     "cep":"19409-524",
--     "pessoa":"juridica",
--     "cnpj":"11.111.111/1111-11",
--     "estadual":"111.111.111.111",
--     "municipal":"isento",
--     "email":"teste@teste.com.br",
--     "celular":"(11)11111-1111",
--     "telefone":"(11)1111-1111",
--     "contato":"anderson"
-- }

-- {
--         "cpf": "222.222.222-22",
--         "nome": "augustina",
--         "dataNasc": "27/01/1960",
--         "endereco": "rua das bromelias",
--         "bairro": "centro",
--         "cidade": "presidente das bromelias",
--         "uf": "sp",
--         "nis": "222.222.222",
--         "genero": "feminino"
-- }