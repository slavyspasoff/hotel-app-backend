import Guest from '../models/guest.model';
import {
  getAllHandler,
  getOneHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} from '../utility/controllerHandlers';

const getAllGuests = getAllHandler(Guest);
const getGuest = getOneHandler(Guest);
const createGuest = createHandler(Guest);
const updateGuest = updateHandler(Guest);
const deleteGuest = deleteHandler(Guest);

export { getAllGuests, getGuest, createGuest, updateGuest, deleteGuest };
