import { Router } from 'express';

import { signup } from '../controllers/authentication.controller';

const router = Router();

router.route('/signup').post(signup);

export { router as default };
