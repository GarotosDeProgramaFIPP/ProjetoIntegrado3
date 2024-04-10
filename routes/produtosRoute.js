import { Router } from "express";
import { ProdutosController } from "../controllers/index.js";

let router = Router();
let ctrl = new ProdutosController();

//view routes
router.get("/", ctrl.listagemView);
router.get("/editar", ctrl.editarView);
router.get("/cadastrar", ctrl.cadastrarView);
//mothods routes
router.get("/all", ctrl.getTodosProdutos);
router.get("/:id", ctrl.getProdutoPorId);
router.post("/", ctrl.addNovoProduto);
router.put("/:id", ctrl.editarProduto);
router.delete("/:id", ctrl.deleteProduto);

export default router;
