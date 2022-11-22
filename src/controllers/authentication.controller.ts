import { env } from 'process';

import jwt, { type SignOptions } from 'jsonwebtoken';
import { type Types } from 'mongoose';
import { type Response, type CookieOptions } from 'express';

import User from '../models/guest.model';
import catchAsync from '../utility/catchAsync';

const { JWT_SECRET, JWT_TOKEN_EXPIRES_IN, COOKIE_EXPIRES_IN, NODE_ENV } = env;

const signToken = (id: Types.ObjectId) => {
  const options: SignOptions = {
    expiresIn: JWT_TOKEN_EXPIRES_IN,
  };
  return jwt.sign({ id }, JWT_SECRET as string, options);
};

const sendJWTCookie = (token: string, res: Response) => {
  const millisecondsToDay = 24 * 60 * 60 * 1000;
  const inProduction = NODE_ENV === 'production';

  const options: CookieOptions = {
    maxAge: Number(COOKIE_EXPIRES_IN as string) * millisecondsToDay,
    httpOnly: true,
    secure: inProduction,
  };

  res.cookie('jwt', token, options);
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  sendJWTCookie(token, res);

  res.status(201).json({
    status: 'success',
    data: { data: newUser },
  });
});

const login = catchAsync(async (req, res, next) => {});

export { signup, login };
