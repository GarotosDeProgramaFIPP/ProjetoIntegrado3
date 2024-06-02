import { UsuarioModel } from "../models/index.js";

class PublicasController {
  homeView(req, res) {
    res.render("./publicas/home");
  }
  ajudeView(req, res) {
    res.render("./publicas/ajude");
  }
  doacaoView(req, res) {
    res.render("./publicas/doacao");
  }
  contatoView(req, res) {
    res.render("./publicas/contato");
  }
  causasView(req, res) {
    res.render("./publicas/causas");
  }
  loginView(req, res) {
    res.render("./publicas/login");
  }
  cadastroView(req, res) {
    res.render("./publicas/cadastro");
  }
  async realizarLogin(req, res) {
    const { email, senha, tipo } = req.body;
    if (email && senha && tipo) {
      let usuarioModel = new UsuarioModel(
        null,
        null,
        email,
        senha,
        null,
        null,
        null,
        null,
        null
      );

      let usuario = await usuarioModel.getUsuarioPorLogin(tipo);

      if (usuario) {
        res.cookie("usuarioLogado", usuario.Id);
        res.cookie("usuarioTipo", tipo);

        res.send({ ok: true, message: "Usuário logado com sucesso!" });
        return;
      }
      res.send({ ok: false, message: "Usuário e/ou senha incorreto(s)" });
      return;
    }

    res.send({
      ok: false,
      message: "Login, senha e tipo de usuário devem ser preenchidos!",
    });
  }

  async addNovoUsuario(req, res) {
    const {
      nome,
      email,
      senha,
      telefone,
      endereco,
      documento,
      administrador,
      voluntario,
      tipo,
    } = req.body;

    if (nome && email && senha && telefone && endereco && documento && tipo) {
      let usuarioModel = new UsuarioModel(
        null,
        nome,
        email,
        senha,
        telefone,
        endereco,
        documento,
        administrador,
        voluntario
      );

      let usuarioCriado = await usuarioModel.addNovoUsuario(tipo);

      if (usuarioCriado) {
        res.send({
          ok: true,
          message: "Usuário criado com sucesso!",
        });
        return;
      }

      res.send({
        ok: false,
        message: "Não foi possível criar usuário!",
      });
    }

    res.send({
      ok: false,
      message: "Todos os campos devem ser preenchidos!",
    });
  }

  logout(req, res) {
    res.clearCookie("usuarioLogado");
    res.clearCookie("usuarioTipo");
    res.send({ ok: true, message: "Usuário deslogado com sucesso!" });
  }
}

export default PublicasController;
