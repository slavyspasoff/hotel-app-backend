import { env } from 'process';

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
const app = express();

import bookingRouter from './routers/booking.router';
import guestRouter from './routers/guest.router';
import roomRouter from './routers/room.router';
import userRouter from './routers/user.router';
const { NODE_ENV } = env;

app.use(express.json({ limit: '15kb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/bookings', bookingRouter);
app.use('/api/guests', guestRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/users', userRouter);
export { app as default };
