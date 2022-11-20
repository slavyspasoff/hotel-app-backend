import { Response, type Request } from 'express';
import { type Model } from 'mongoose';

import catchAsync from './catchAsync';

const createHandlers = <T, U, K>(model: Model<T, U, K>) =>
  catchAsync(async (req, res, next) => {
    const data = await model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { data },
    });
  });

export { createHandlers };
