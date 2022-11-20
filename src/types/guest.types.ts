import { type Types, type Model } from 'mongoose';

interface GuestDocument {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
  bookings: Types.ObjectId[];
}

interface GuestMethods {}

interface GuestQueryHelpers {}

interface GuestVirtuals {}

type GuestModel = Model<
  GuestDocument,
  GuestQueryHelpers,
  GuestMethods,
  GuestVirtuals
>;

export {
  type GuestDocument,
  type GuestModel,
  type GuestMethods,
  type GuestQueryHelpers,
  type GuestVirtuals,
};
