import {
  getAllHandler,
  getOneHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} from '../utility/controllerHandlers.js';
import Booking from '../models/booking.model.js';

const getAllBookings = getAllHandler(Booking);
const getBooking = getOneHandler(Booking);
const createBooking = createHandler(Booking);
const deleteBooking = deleteHandler(Booking);
const updateBooking = updateHandler(Booking);
export {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
