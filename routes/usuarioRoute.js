import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';

let ctrl = new UsuarioController();

let router = Router();
router.get('/',ctrl.listagemView);
router.get('/cadastrar',ctrl.cadastroView);
router.post('/cadastrar',ctrl.cadastrar);
router.get('/users', ctrl.getAllUsers);
router.get('/user/', ctrl.getUserByName);

export default router;