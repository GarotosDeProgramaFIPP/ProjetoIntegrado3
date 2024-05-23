import { Router } from "express";
import { PatrimoniosController } from "../controllers/index.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

let router = Router();
let ctrl = new PatrimoniosController();
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
router.get("/all", ctrl.getTodosPatrimonios);
router.get("/:id", ctrl.getPatrimonioPorId);
router.post("/", ctrl.addNovoPatrimonio);
router.put("/:id", ctrl.editarPatrimonio);
router.delete("/:id", ctrl.deletePatrimonio);

export default router;
