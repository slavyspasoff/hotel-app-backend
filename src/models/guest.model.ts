import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';

import {
  type GuestDocument,
  type GuestModel,
  type GuestMethods,
} from '../types/guest.types.js';

const guestSchema = new Schema<GuestDocument, GuestModel, GuestMethods>(
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
    },
    passwordChangeDate: {
      type: Date,
    },
    permission: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
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

guestSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await hash(this.password, 12);
  this.confirmationPassword = undefined;
  next();
});

guestSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.passwordChangeDate = new Date(Date.now() - 2000);
  next();
});

guestSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'bookings',
    select: '-guests -__v',
  });
  next();
});

guestSchema.methods.verifyIsTokenExpired = function (
  this: GuestDocument,
  timestamp: number
) {
  if (!this.passwordChangeDate) {
    return false;
  }
  console.log(new Date(timestamp * 1000));
  console.log(this.passwordChangeDate);
  return timestamp * 1000 < this.passwordChangeDate.getTime();
};

guestSchema.methods.verifyPassword = async function (
  this: GuestDocument,
  candidatePassword: string
) {
  return await compare(candidatePassword, this.password);
};

const Guest = model<GuestDocument, GuestModel>('Guest', guestSchema);

export { Guest as default };
