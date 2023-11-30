import Usuario from "../Modelo/usuarios.js";
import bcrypt from "bcrypt";

export default class UsuarioCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const perfil = dados.perfil;
      const datacadastro = dados.datacadastro;
      const senha = dados.senha;
      if (nome && perfil && datacadastro && senha) {
        const usuarios = new Usuario(0, nome, perfil, datacadastro, senha);
        usuarios
          .gravar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Serviço adicionado com sucesso!",
              codUsuario: usuarios.codUsuario,
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem: "Não foi possível gravar o  serviço: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do consumo de usuario. Verifique a documentação da API.",
        });
      }
    } //requisição não é POST ou não possui dados no formato json
    else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const perfil = dados.perfil;
      const datacadastro = dados.datacadastro;
      const senha = dados.senha;

      if (nome && perfil && datacadastro && senha) {
        const usuario = new Usuario(0, nome, perfil, datacadastro, senha);
        usuario
          .atualizar()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: " Usuario atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            //funções de callback
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível atualizar o consumo de usuario: " +
                erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe todos os dados do consumo de usuario. Verifique a documentação da API.",
        });
      }
    } //requisição não é PUT ou não possui dados no formato json
    else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codUsuario = dados.codUsuario; // Apenas o ID é necessário para excluir
      if (codUsuario) {
        const usuario = new Usuario(codUsuario);
        usuario
          .removerDoBancoDados()
          .then(() => {
            resposta.json({
              status: true,
              mensagem: "Usuário excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.json({
              status: false,
              mensagem: "Não foi possível excluir o usuário: " + erro.message,
            });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe o código do usuário. Verifique a documentação da API.",
        });
      }
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/JSON");
    if (requisicao.method === "GET") {
      const usuario = new Usuario();
      usuario
        .consultar("")
        .then((usuarios) => {
          resposta.status(200).json(usuarios);
        })
        .catch((erro) => {
          resposta.json({
            status: false,
            mensagem: "Falha ao obter consumo de usuários: " + erro.message,
          });
        });
    } else {
      resposta.json({
        status: false,
        mensagem: "Método não permitido. Verifique a documentação da API.",
      });
    }
  }
  autenticarUsuario(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const username = dados.username;
      const password = dados.password;

      if (username && password) {
        // Consulte o usuário no banco de dados usando o método do modelo ou DAO
        Usuario.consultarPorUsername(username)
          .then((usuario) => {
            // Verifique se o usuário existe e a senha está correta
            if (usuario && bcrypt.compareSync(password, usuario.senha)) {
              // Autenticação bem-sucedida, retorne os detalhes do usuário
              resposta.json({
                username: usuario.nome,
                perfil: usuario.perfil,
                // ... outros detalhes do usuário que você deseja incluir
              });
            } else {
              // Credenciais inválidas
              resposta
                .status(401)
                .json({ status: false, mensagem: "Credenciais inválidas" });
            }
          })
          .catch((erro) => {
            // Lidar com erros de consulta ao banco de dados ou outros erros
            console.error("Erro ao autenticar usuário:", erro.message);
            resposta
              .status(500)
              .json({ status: false, mensagem: "Erro interno do servidor" });
          });
      } else {
        resposta.json({
          status: false,
          mensagem:
            "Informe o nome de usuário e a senha. Verifique a documentação da API.",
        });
      }
    } else {
      resposta.json({
        status: false,
        mensagem:
          "Método não permitido ou formato de dados inválido. Verifique a documentação da API.",
      });
    }
  }
}
