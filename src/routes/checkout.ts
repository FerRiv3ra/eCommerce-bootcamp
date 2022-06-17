import { Router } from 'express';

import { checkout, confirmPay } from '../controllers/payments';
import { validateJWT } from '../middlewares/validarJWT';

const router: Router = Router();

router.post('/', validateJWT, checkout);

router.get('/:id', validateJWT, confirmPay);

export default router;
