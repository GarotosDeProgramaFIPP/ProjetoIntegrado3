import { Router } from "express";
import { RelatoriosController } from "../controllers/index.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

let router = Router();
let ctrl = new RelatoriosController();
let auth = new AuthMiddleware();

//view routes
router.get("/", auth.verificarUsuarioAdministrador, ctrl.listagemView);
//mothods routes
router.get("/all", auth.verificarUsuarioAdministrador, ctrl.getTodosRelatorios);
router.get(
  "/tipos",
  auth.verificarUsuarioAdministrador,
  ctrl.getTipoRelatorios
);
router.get("/request", ctrl.requestReport);

export default router;
