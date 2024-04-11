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
}

export default PublicasController;
