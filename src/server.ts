import { env } from 'process';
import './utility/dotenvConfig.js';

import mongoose from 'mongoose';

import app from './app.js';

const { PORT, NODE_ENV } = env;
const port = PORT || 3030;

mongoose
  .connect('mongodb://127.0.0.1:27017/HotelBooking')
  .then((connection) => {
    console.log(
      `Connected to \x1b[34;1m${connection.connection.name}\x1b[0m database.`
    );
  })
  .catch((err) => {
    console.log(`Failed to connect to the database with an error:\n${err}`);
  });

const server = app.listen(port, () => {
  console.log(`Server listening on \x1b[35;1mhttp://127.0.0.1:${port}\x1b[0m`);
});
