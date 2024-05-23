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
}

export default PublicasController;
