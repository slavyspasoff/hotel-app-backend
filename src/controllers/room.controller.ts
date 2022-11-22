import Room from '../models/room.model';
import {
  getAllHandler,
  getOneHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} from '../utility/controllerHandlers';

const getAllRooms = getAllHandler(Room);
const getRoom = getOneHandler(Room);
const createRoom = createHandler(Room);
const updateRoom = updateHandler(Room);
const deleteRoom = deleteHandler(Room);

export { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom };
