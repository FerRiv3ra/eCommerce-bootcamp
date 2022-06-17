import { Router } from 'express';
import { check } from 'express-validator';
import { validColection } from '../helpers/dbValidations';
import { validateFile } from '../middlewares/validate-files';
import { validarCampos } from '../middlewares/validar-campos';
import { updateImg } from '../controllers/uploads';
import { validateJWT } from '../middlewares/validarJWT';

const router = Router();

router.put(
  '/:collection/:id',
  [
    validateJWT,
    validateFile,
    check('id', 'Is not valid ID').isMongoId(),
    check('collection').custom((c: string) =>
      validColection(c, ['users', 'products'])
    ),
    validarCampos,
  ],
  updateImg
);

export default router;
