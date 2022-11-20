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
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmationPassword: {
      type: String,
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
    select: '-__v',
  });
  next();
});

const Guest = model('Guest', guestSchema);

export { Guest as default };
