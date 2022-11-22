import { type Types, type Model } from 'mongoose';

interface RoomDocument {
  type: 'loft-single' | 'loft-double' | 'big-room' | 'apartment';
  number: number;
  bedType: 'single' | 'double' | 'queen-size' | 'king-size';
  ratingAverage: number;
  reviews: Types.ObjectId[];
  price: number;
  images: string[];
}

interface RoomMethods {}
interface RoomQueryHelpers {}
interface RoomVirtuals {}

type RoomModel = Model<
  RoomDocument,
  RoomQueryHelpers,
  RoomMethods,
  RoomVirtuals
>;

export {
  type RoomDocument,
  type RoomModel,
  type RoomMethods,
  type RoomVirtuals,
  type RoomQueryHelpers,
};
