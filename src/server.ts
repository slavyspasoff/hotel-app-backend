import dotenv from 'dotenv';
dotenv.config();

import { env } from 'process';

import app from './app';

const { PORT, NODE_ENV } = env;
const port = PORT || 3030;

const server = app.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
});
