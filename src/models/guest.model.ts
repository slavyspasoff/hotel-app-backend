import { Schema, model } from 'mongoose';

import {
  type GuestDocument,
  type GuestModel,
  type GuestMethods,
  type GuestQueryHelpers,
  type GuestVirtuals,
} from '../types/guest.types';

const guestSchema = new Schema<
  GuestDocument,
  GuestModel,
  GuestMethods,
  GuestQueryHelpers,
  GuestVirtuals
>(
  {
    name: {
      type: String,
      required: [true, 'Guest must have a name.'],
      minlength: [6, 'Name must be between 6 and 100 characters long.'],
      maxlength: [100, 'Name must be between 6 and 100 characters long.'],
    },
    email: {
      type: String,
      required: [true, 'Guest must have an email.'],
      maxlength: [100, 'Email must be no more than 100 characters long.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Guest must have a password.'],
      minlength: [8, 'Password must be between 8 and 50 characters long.'],
      maxlength: [50, 'Password must be between 8 and 50 characters long.'],
      select: false,
    },
    confirmationPassword: {
      type: String,
      required: [true, 'Guest must have a confirmation password.'],
      validate: {
        validator: function (this: GuestDocument, v: string) {
          return v === this.password;
        },
        message: 'Password and confirmation password are not the same.',
      },
      select: false,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

guestSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'bookings',
    select: '-guests -__v',
  });
  next();
});

const Guest = model('Guest', guestSchema);

export { Guest as default };
