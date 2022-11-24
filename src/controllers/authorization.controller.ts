import { env } from 'process';

import jsonwebtoken, { type JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utility/catchAsync.js';
import ExpressAppError from '../utility/ExpressAppError.js';
import User from '../models/guest.model.js';

//TODO: Find out why VSCode is fine with declaring this namespace into global.types.ts but the compiler wants it into the same file.
import { type GuestDocument } from '../types/guest.types.js';
declare global {
  namespace Express {
    interface Request {
      user: GuestDocument;
    }
  }
}

const { JWT_SECRET } = env;

const asyncVerify = (t: string, s: string): JwtPayload =>
  new Promise((res, rej) => {
    jsonwebtoken.verify(t, s, (err, decoded) => {
      if (err) {
        rej(err);
      }
      res(decoded);
    });
  });

//TODO: Research and see if JWT header authorization is better than one with a cookie.
// const headerAuthorization = async (req: Request, next: NextFunction) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return next(new ExpressAppError('Login required.', 401));
//   }

//   const [bearer, token] = authorization.split(' ');

//   if (!bearer || !token || bearer !== 'Bearer') {
//     return next(new ExpressAppError('Login required.', 401));
//   }

//   const { id, iat } = await asyncVerify(token, JWT_SECRET as string);
//   return { id, iat };
// };

//TODO: Add better error messages.
const authorize = catchAsync(async (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new ExpressAppError('Login required.', 401));
  }
  //TODO: Add invalid token custom error handler
  const { id, iat, exp } = await asyncVerify(token, JWT_SECRET as string);

  if (!id || !iat) {
    return next(new ExpressAppError('Invalid credentials.', 401));
  }
  const foundUser = await User.findById(id);
  if (!foundUser) {
    return next(
      new ExpressAppError('No user associated with this token.', 401)
    );
  }
  //TODO: Add check if user has changed his password after the "iat"(token issued at)
  req.user = foundUser;

  next();
});

export { authorize };
