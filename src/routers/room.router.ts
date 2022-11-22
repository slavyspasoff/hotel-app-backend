import { Router } from 'express';

import {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/room.controller';

const router = Router();

router.route('/').get(getAllRooms).post(createRoom);
router.route('/:id').get(getRoom).patch(updateRoom).delete(deleteRoom);

export { router as default };
