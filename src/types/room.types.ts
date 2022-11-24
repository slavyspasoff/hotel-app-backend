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
type RoomModel = Model<RoomDocument, {}, RoomMethods>;
export { type RoomDocument, type RoomModel, type RoomMethods };
