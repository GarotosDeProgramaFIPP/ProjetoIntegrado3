import { Router } from "express";
import { PatrimoniosController } from "../controllers/index.js";

let router = Router();
let ctrl = new PatrimoniosController();

//view routes
router.get("/", ctrl.listagemView);
router.get("/editar/:id", ctrl.editarView);
router.get("/cadastrar", ctrl.cadastrarView);
//mothods routes
router.get("/all", ctrl.getTodosPatrimonios);
router.get("/:id", ctrl.getPatrimonioPorId);
router.post("/", ctrl.addNovoPatrimonio);
router.put("/:id", ctrl.editarPatrimonio);
router.delete("/:id", ctrl.deletePatrimonio);

export default router;
