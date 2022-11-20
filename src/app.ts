import { env } from 'process';

import express from 'express';
import morgan from 'morgan';
const app = express();

import bookingRouter from './routers/booking.router';

const { NODE_ENV } = env;

app.use(express.json({ limit: '15kb' }));
app.use(morgan('dev'));

app.use('/api/bookings', bookingRouter);

export { app as default };
