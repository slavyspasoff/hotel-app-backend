import { type Types, type Model } from 'mongoose';

interface BookingDocument {
  arrivalDate: Date;
  departureDate: Date;
  guests: Types.ObjectId[];
  roomNumber: Types.ObjectId;
  isBreakfastIncl: boolean;
}

interface BookingMethods {}

type BookingModel = Model<BookingDocument, {}, BookingMethods>;

export { type BookingDocument, type BookingModel, type BookingMethods };
