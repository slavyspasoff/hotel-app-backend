import { type Types, type Model } from 'mongoose';

interface GuestDocument {
  name: string;
  email: string;
  password: string;
  confirmationPassword?: string;
  bookings: Types.ObjectId[];
}

interface GuestMethods {}

type GuestModel = Model<GuestDocument, {}, GuestMethods>;

export { type GuestDocument, type GuestModel, type GuestMethods };
