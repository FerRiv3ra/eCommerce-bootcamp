import { Router } from 'express';

import { check } from 'express-validator';
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from '../controllers/category';
import { validateJWT } from '../middlewares/validarJWT';
import { validarCampos } from '../middlewares/validar-campos';
import {
  validCategoriaExists,
  validCategoriaExistsByID,
} from '../helpers/dbValidations';

const router: Router = Router();

router.get('/', getCategories);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'Category name is required').not().isEmpty(),
    check('name').custom(validCategoriaExists),
    validarCampos,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(validCategoriaExistsByID),
    check('name', 'Category name is required').not().isEmpty(),
    check('name').custom(validCategoriaExists),
    validarCampos,
  ],
  editCategory
);

router.delete(
  '/:id',
  [validateJWT, check('id', 'Is not a valid ID').isMongoId(), validarCampos],
  deleteCategory
);

export default router;
