import { env } from 'process';

import { type Response, type CookieOptions } from 'express';
import { type Types } from 'mongoose';
import { compare } from 'bcrypt';
import jsonwebtoken, { type SignOptions } from 'jsonwebtoken';

import User from '../models/guest.model.js';
import catchAsync from '../utility/catchAsync.js';
import ExpressAppError from '../utility/ExpressAppError.js';

const { JWT_SECRET, JWT_TOKEN_EXPIRES_IN, COOKIE_EXPIRES_IN, NODE_ENV } = env;

const signToken = (id: Types.ObjectId) => {
  const options: SignOptions = {
    expiresIn: JWT_TOKEN_EXPIRES_IN,
  };

  return jsonwebtoken.sign({ id }, JWT_SECRET as string, options);
};

const createJWTCookie = (token: string, res: Response) => {
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

  createJWTCookie(token, res);

  res.status(201).json({
    status: 'success',
    token,
    data: { data: newUser },
  });
});

//TODO: Add better error messages
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressAppError('Email and password required.', 401));
  }

  const foundGuest = await User.findOne({ email }).select('+password');

  if (!foundGuest) {
    return next(new ExpressAppError('Invalid email or password.', 401));
  }

  const correctCredentials = await compare(password, foundGuest!.password);

  if (!correctCredentials) {
    return next(new ExpressAppError('Invalid email or password.', 401));
  }

  const token = signToken(foundGuest!._id);

  createJWTCookie(token, res);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      data: foundGuest,
    },
  });
});

export { signup, login };
