import { Schema, model } from 'mongoose';

import {
  type BookingInterface,
  type BookingModel,
  type BookingMethods,
  type BookingQueryHelpers,
  type BookingVirtuals,
} from '../types/booking.types';

const bookingSchema = new Schema<
  BookingInterface,
  BookingModel,
  BookingMethods,
  BookingQueryHelpers,
  BookingVirtuals
>(
  {
    arrivalDate: Date,
    departureDate: Date,
    maxGuests: Number,
    isBreakfastIncl: Boolean,
    guests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Guest',
        // required: [true, 'Guest is required!'],
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

bookingSchema.virtual('stayDuration').get(function () {
  const timestampDifference =
    this.departureDate.getTime() - this.arrivalDate.getTime();
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const differenceInDays = timestampDifference / millisecondsInADay;
  return Math.ceil(differenceInDays);
});

const Booking = model('Booking', bookingSchema);

export { Booking as default };
