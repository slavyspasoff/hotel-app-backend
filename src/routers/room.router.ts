import { Router } from 'express';

import {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/room.controller.js';
import reviewRouter from '../routers/review.router.js';

import { verifyJWT } from '../utility/verifyJWT.js';

const router = Router();
router.use('/:roomID/reviews', reviewRouter);
router.route('/').get(verifyJWT, getAllRooms).post(createRoom);
router.route('/:id').get(getRoom).patch(updateRoom).delete(deleteRoom);

export { router as default };
