import { Router } from 'express';

import {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/room.controller';
import reviewRouter from '../routers/review.router';

const router = Router();
router.use('/:roomID/reviews', reviewRouter);
router.route('/').get(getAllRooms).post(createRoom);
router.route('/:id').get(getRoom).patch(updateRoom).delete(deleteRoom);

export { router as default };
