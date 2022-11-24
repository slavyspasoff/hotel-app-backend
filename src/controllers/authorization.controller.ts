import { type RequestHandler } from 'express';

import ExpressAppError from '../utility/ExpressAppError.js';

export default (): RequestHandler => (req, res, next) => {
  if (req.user.permission !== 'admin') {
    return next(new ExpressAppError('Permission denied.', 403));
  }
  next();
};
