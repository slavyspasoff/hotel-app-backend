import catchAsync from '../utility/catchAsync';
import { createHandlers } from '../utility/controllerHandlers';
import Booking from '../models/booking.model';

const createBooking = createHandlers(Booking);

export { createBooking };
