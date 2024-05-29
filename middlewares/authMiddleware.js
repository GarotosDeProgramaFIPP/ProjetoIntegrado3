import { UsuarioModel } from "../models/index.js";

class AuthMiddleware {
  async verificarUsuarioLogado(req, res, next) {
    if (req.cookies != undefined && req.cookies.usuarioLogado != null) {
      let usuarioId = req.cookies.usuarioLogado;
      let usuarioTipo = req.cookies.usuarioTipo;
      let usuario = new UsuarioModel(usuarioId);
      usuario = await usuario.getUsuarioPorId();
      if (usuario) {
        let isAdmin =
          usuarioTipo.toLowerCase() === "pj" ? false : usuario.Administrador;
        res.locals.usuarioLogado = { ...usuario, Administrador: isAdmin };
      }
    }
    next();
  }

  async verificarUsuarioAdministrador(req, res, next) {
    if (req.cookies != undefined && req.cookies.usuarioLogado != null) {
      let usuarioId = req.cookies.usuarioLogado;
      let usuarioTipo = req.cookies.usuarioTipo;
      if (usuarioTipo.toLowerCase() === "pj") {
        res.redirect("/nao-autorizado");
      }
      let usuario = new UsuarioModel(usuarioId);
      usuario = await usuario.getUsuarioPorId();
      if (!usuario) res.redirect("/login");
      if (usuario.Administrador) {
        res.locals.usuarioLogado = usuario;
        next();
      } else {
        res.redirect("/nao-autorizado");
      }
    } else {
      res.redirect("/login");
    }
  }
}

export default AuthMiddleware;
