import { env } from 'process';

import express from 'express';
import morgan from 'morgan';
const app = express();

import bookingRouter from './routers/booking.router';
import guestRouter from './routers/guest.router';

const { NODE_ENV } = env;

app.use(express.json({ limit: '15kb' }));
app.use(morgan('dev'));

app.use('/api/bookings', bookingRouter);
app.use('/api/guests', guestRouter);

export { app as default };
