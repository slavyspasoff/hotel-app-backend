import { Router } from 'express';

import {
  getAllGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
} from '../controllers/guest.controller';

const router = Router();

router.route('/').get(getAllGuests).post(createGuest);
router.route('/:id').get(getGuest).patch(updateGuest).delete(deleteGuest);

export { router as default };
