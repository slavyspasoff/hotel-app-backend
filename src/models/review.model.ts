import { Schema, model } from 'mongoose';

import {
  type ReviewDocument,
  type ReviewModel,
  type ReviewMethods,
} from '../types/review.types.js';

const reviewSchema = new Schema<ReviewDocument, ReviewModel, ReviewMethods>({
  text: {
    type: String,
    required: [true, 'Review must have a text.'],
    minlength: [1, 'Review must be between one and five-hundred characters'],
    maxlength: [500, 'Review must be between one and five-hundred characters'],
  },
  rating: {
    type: Number,
    min: [1, 'Review can have a rating between one and five.'],
    max: [5, 'Review can have a rating between one and five.'],
    required: [true, 'Review must have a rating'],
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Review must have associated room.'],
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Review must have associated guest.'],
  },
});

const Review = model<ReviewDocument, ReviewModel>('Review', reviewSchema);

export { Review as default };
