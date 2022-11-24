import { Router } from 'express';

import {
  getAllGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
} from '../controllers/guest.controller.js';
import reviewRouter from '../routers/review.router.js';

const router = Router();
router.use('/:guestID/reviews', reviewRouter);
router.route('/').get(getAllGuests).post(createGuest);
router.route('/:id').get(getGuest).patch(updateGuest).delete(deleteGuest);

export { router as default };
