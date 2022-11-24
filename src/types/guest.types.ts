import { type Types, type Model } from 'mongoose';

interface GuestDocument {
  name: string;
  email: string;
  password: string;
  confirmationPassword?: string;
  passwordChangeDate?: Date;
  bookings: Types.ObjectId[];
}

interface GuestMethods {
  verifyIsTokenExpired: (v: number) => boolean;
}

type GuestModel = Model<GuestDocument, {}, GuestMethods>;

export { type GuestDocument, type GuestModel, type GuestMethods };
