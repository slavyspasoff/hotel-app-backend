import { type Types, Model } from 'mongoose';

interface ReviewDocument {
  text: string;
  rating: number;
  room: Types.ObjectId;
  user: Types.ObjectId;
}
type ReviewMethods = {};

type ReviewModel = Model<ReviewDocument, {}, ReviewMethods>;

export { type ReviewDocument, type ReviewModel, type ReviewMethods };
