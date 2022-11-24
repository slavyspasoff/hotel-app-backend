import { env } from 'process';

import { type Response, type CookieOptions } from 'express';
import { type Types } from 'mongoose';
import { compare } from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';

import User from '../models/guest.model.js';
import catchAsync from '../utility/catchAsync.js';
import ExpressAppError from '../utility/ExpressAppError.js';

const { JWT_SECRET, JWT_TOKEN_EXPIRES_IN, COOKIE_EXPIRES_IN, NODE_ENV } = env;

const signToken = (id: Types.ObjectId) => {
  const options: SignOptions = {
    expiresIn: JWT_TOKEN_EXPIRES_IN,
  };
  return jwt.sign({ id }, JWT_SECRET as string, options);
};

const createJWTCookie = (token: string, res: Response) => {
  const millisecondsToDay = 24 * 60 * 60 * 1000;
  const inProduction = NODE_ENV === 'production';

  const options: CookieOptions = {
    maxAge: Number(COOKIE_EXPIRES_IN as string) * millisecondsToDay,
    httpOnly: true,
    secure: inProduction,
  };
  ExpressAppError;

  res.cookie('jwt', token, options);
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  createJWTCookie(token, res);

  res.status(201).json({
    status: 'success',
    data: { data: newUser },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressAppError('Email and password required!', 403));
  }
  const foundGuest = await User.findOne({ email }).select('+password');
  //TODO: Add error if not guest/user found
  const correctCredentials = await compare(password, foundGuest!.password);
  //TODO: Add error on incorrect credentials
  const token = signToken(foundGuest!._id);
  createJWTCookie(token, res);
  res.status(200).json({
    message: 'success',
    data: {
      data: foundGuest,
    },
  });
});

export { signup, login };
