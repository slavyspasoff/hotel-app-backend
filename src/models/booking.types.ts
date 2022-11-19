import { type Types, type Model } from 'mongoose';

interface BookingInterface {
  arrivalDate: Date;
  departureDate: Date;
  guests: Types.ObjectId[];
  maxGuests: number;
  roomNumber: Types.ObjectId;
  isBreakfastIncl: boolean;
  stayDuration: number;
}

interface BookingMethods {}

//TODO: remove stayDuration from interface and add it to Virtuals once I know how...
interface BookingVirtuals {
  stayDuration: number;
}
interface BookingQueryHelpers {}

type BookingModel = Model<
  BookingInterface,
  BookingQueryHelpers,
  BookingMethods,
  BookingVirtuals
>;

export {
  type BookingInterface,
  type BookingModel,
  type BookingMethods,
  type BookingVirtuals,
};
