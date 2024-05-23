import { UsuarioModel } from "../models/index.js";

class AuthMiddleware {
  async verificarUsuarioLogado(req, res, next) {
    if (req.cookies != undefined && req.cookies.usuarioLogado != null) {
      let usuarioId = req.cookies.usuarioLogado;
      let usuario = new UsuarioModel(usuarioId);
      usuario = await usuario.getUsuarioPorId();
      if (usuario) {
        res.locals.usuarioLogado = usuario;
      }
    }
    next();
  }

  async verificarUsuarioAdministrador(req, res, next) {
    if (req.cookies != undefined && req.cookies.usuarioLogado != null) {
      let usuarioId = req.cookies.usuarioLogado;
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
