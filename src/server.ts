import dotenv from 'dotenv';

dotenv.config();

import { env } from 'process';

import mongoose from 'mongoose';

import app from './app';

const { PORT, NODE_ENV } = env;
const port = PORT || 3030;

mongoose
  .connect('mongodb://127.0.0.1:27017/HotelBooking')
  .then((connection) => {
    console.log(`Connected to ${connection.connection.name} database.`);
  })
  .catch((err) => {
    console.log(`Failed to connect to the database with an error:\n${err}`);
  });

const server = app.listen(port, () => {
  console.log(
    `Server listening on \x1b[30;1m http://127.0.0.1:${port} \x1b[0m`
  );
});
