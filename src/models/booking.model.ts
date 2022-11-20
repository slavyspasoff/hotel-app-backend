import { Schema, model } from 'mongoose';

import {
  type BookingDocument,
  type BookingModel,
  type BookingMethods,
  type BookingQueryHelpers,
  type BookingVirtuals,
} from '../types/booking.types';

const bookingSchema = new Schema<
  BookingDocument,
  BookingModel,
  BookingMethods,
  BookingQueryHelpers,
  BookingVirtuals
>(
  {
    arrivalDate: {
      type: Date,
      required: [true, 'Booking must have an arrival date.'],
      validate: {
        validator: function (this: BookingDocument, v: Date) {
          v.getTime() > Date.now();
        },
        message:
          'Booking must have an arrival date equal or greater than the current date.',
      },
    },
    departureDate: {
      type: Date,
      required: [true, 'Booking must have an departure date.'],

      validate: {
        validator: function (this: BookingDocument, v: Date) {
          v.getTime() > this.arrivalDate.getTime();
        },
        message:
          'Booking must have an departure date equal or greater than the arrival date. ',
      },
    },
    isBreakfastIncl: {
      type: Boolean,
      default: false,
    },
    guests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Guest',
        required: [true, 'Booking must have one or more guests.'],
      },
    ],
    roomNumber: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      // required: [true, 'Room number is required!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guests',
    select: '-__v -bookings',
  });
  next();
});

bookingSchema.virtual('stayDuration').get(function () {
  const timestampDifference =
    this.departureDate.getTime() - this.arrivalDate.getTime();
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const differenceInDays = timestampDifference / millisecondsInADay;
  return Math.ceil(differenceInDays);
});

bookingSchema.virtual('numberOfGuests').get(function () {
  return this.guests.length;
});

const Booking = model('Booking', bookingSchema);

export { Booking as default };
