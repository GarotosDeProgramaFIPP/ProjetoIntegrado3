import { Router } from "express";
import { EventosController } from "../controllers/index.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

let router = Router();
let ctrl = new EventosController();
let auth = new AuthMiddleware();

//view routes
router.get("/", auth.verificarUsuarioAdministrador, ctrl.listagemView);
router.get("/editar/:id", auth.verificarUsuarioAdministrador, ctrl.editarView);
router.get(
  "/cadastrar",
  auth.verificarUsuarioAdministrador,
  ctrl.cadastrarView
);
//mothods routes
router.get("/all", ctrl.getTodosEventos);
router.get("/:id", ctrl.getEventoPorId);
router.post("/", ctrl.addNovoEvento);
router.put("/:id", ctrl.editarEvento);
router.delete("/:id", ctrl.deleteEvento);

export default router;
