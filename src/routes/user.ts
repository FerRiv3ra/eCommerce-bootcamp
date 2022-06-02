import { Router } from 'express';

import { check } from 'express-validator';
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from '../controllers/users';
import { validEmail, validRole, validUserById } from '../helpers/dbValidations';
import { validarCampos } from '../middlewares/validar-campos';
import { isSameAccount } from '../middlewares/validar-cuenta';
import { isAdminRole } from '../middlewares/validar-role';
import { validateJWT } from '../middlewares/validarJWT';

const router: Router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post(
  '/',
  [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Correo no válido').isEmail(),
    check('email').custom(validEmail),
    check(
      'password',
      'La contraseña dede tener al menos 8 caracteres'
    ).isLength({ min: 8 }),
    check(
      'password',
      'La contraseña dede tener al menos una minúscula, una mayúscula, un número y un caracter especial'
    ).isStrongPassword(),
    check('role').custom(validRole),
    validarCampos,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    isSameAccount,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validUserById),
    check('role').custom(validRole),
    validarCampos,
  ],
  editUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    // hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validUserById),
    validarCampos,
  ],
  deleteUser
);

export default router;
