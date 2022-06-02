import { Router } from 'express';

import { check } from 'express-validator';
import { checkout } from '../controllers/payments';

const router: Router = Router();

router.post('/', checkout);

export default router;
