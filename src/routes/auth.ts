import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { googleSignIn, login, tokenLogin } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';
import { validateJWT } from '../middlewares/validarJWT';

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  '/google',
  [
    check('id_token', 'El id_token es necesario para esta acción')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

router.get('/login', validateJWT, tokenLogin);

export default router;
