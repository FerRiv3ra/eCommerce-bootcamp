import { Router } from 'express';

import { check } from 'express-validator';

import { validateJWT } from '../middlewares/validarJWT';
import { validarCampos } from '../middlewares/validar-campos';
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from '../controllers/product';
import {
  validProductoExists,
  validCategoriaExistsByID,
  validProductoExistsByID,
} from '../helpers/dbValidations';
import validFilterCategory from '../middlewares/validar-filtroCategory';

const router: Router = Router();

router.get('/', validFilterCategory, getProducts);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name of product is required').not().isEmpty(),
    check('name').custom(validProductoExists),
    check('price', 'The product price is required').not().isEmpty(),
    check('price', 'The product price is not valid').isNumeric(),
    check('stock', 'The product stock is required').not().isEmpty(),
    check('stock', 'The product stock is not valid').isNumeric(),
    check('category', 'The category ID is required').not().isEmpty(),
    check('category', 'The category ID is not valid').isMongoId(),
    check('category').custom(validCategoriaExistsByID),
    check('brand', 'Brand is required').not().isEmpty(),
    validarCampos,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not valid ID').not().isEmpty(),
    check('id').custom(validProductoExistsByID),
    check('name', 'Name of product is required').not().isEmpty(),
    check('price', 'The product price is required').not().isEmpty(),
    check('price', 'The product price is not valid').isNumeric(),
    check('stock', 'The product stock is required').not().isEmpty(),
    check('stock', 'The product stock is not valid').isNumeric(),
    check('category', 'The category ID is required').not().isEmpty(),
    check('category', 'The category ID is not valid').isMongoId(),
    check('category').custom(validCategoriaExistsByID),
    check('brand', 'Brand is required').not().isEmpty(),
    validarCampos,
  ],
  editProduct
);

router.delete(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not valid ID').not().isEmpty(),
    check('id').custom(validProductoExistsByID),
    validarCampos,
  ],
  deleteProduct
);

export default router;
