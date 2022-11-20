import { type Types, type Model } from 'mongoose';

interface BookingDocument {
  arrivalDate: Date;
  departureDate: Date;
  guests: Types.ObjectId[];
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
  BookingDocument,
  BookingQueryHelpers,
  BookingMethods,
  BookingVirtuals
>;

export {
  type BookingDocument,
  type BookingModel,
  type BookingMethods,
  type BookingQueryHelpers,
  type BookingVirtuals,
};
