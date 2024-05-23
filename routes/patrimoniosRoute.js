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
router.get("/alocar", auth.verificarUsuarioAdministrador, ctrl.alocarView);
//mothods routes
router.get("/all", ctrl.getTodosPatrimonios);
router.get("/:id", ctrl.getPatrimonioPorId);
router.post("/", ctrl.addNovoPatrimonio);
router.put("/:id", ctrl.editarPatrimonio);
router.delete("/:id", ctrl.deletePatrimonio);
router.post("/alocar", ctrl.alocarPatrimonio);

export default router;
