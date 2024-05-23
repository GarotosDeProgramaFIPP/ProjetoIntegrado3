import { Router } from "express";
import { ProdutosController } from "../controllers/index.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

let router = Router();
let ctrl = new ProdutosController();
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
router.get("/all", ctrl.getTodosProdutos);
router.get("/:id", ctrl.getProdutoPorId);
router.post("/", ctrl.addNovoProduto);
router.put("/:id", ctrl.editarProduto);
router.delete("/:id", ctrl.deleteProduto);

export default router;
