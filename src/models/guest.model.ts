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
    booking: [
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

const Guest = model('Guest', guestSchema);

export { Guest as default };
