import { Router } from 'express';

import {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/booking.controller.js';
const router = Router();

router.route('/').get(getAllBookings).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

export { router as default };
