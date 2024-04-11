class PublicasController {
  homeView(req, res) {
    res.render("./publicas/home");
  }
  sobreView(req, res) {
    res.render("./publicas/sobre");
  }
  postsView(req, res) {
    res.render("./publicas/posts");
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
}

export default PublicasController;
