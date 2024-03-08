import { Router } from 'express';
import LoginController from '../controllers/loginController.js';

const router = Router();

let ctrl = new LoginController();
router.get('/', ctrl.loginView);
router.post('/validar', ctrl.login);


export default router;