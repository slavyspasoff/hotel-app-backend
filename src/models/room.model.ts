import { Schema, model } from 'mongoose';
import {
  type RoomDocument,
  type RoomModel,
  type RoomMethods,
  type RoomVirtuals,
  type RoomQueryHelpers,
} from '../types/room.types';

const roomSchema = new Schema<
  RoomDocument,
  RoomModel,
  RoomMethods,
  RoomQueryHelpers,
  RoomVirtuals
>({
  type: {
    type: String,
    enum: ['loft-single', 'loft-double', 'big-room', 'apartment'],
    required: [true, 'Room must have a type.'],
  },
  number: {
    type: Number,
    min: 101,
    max: 426,
    validate: {
      validator: function (this: RoomDocument, v: number) {
        const omitFirstNumber = Number(String(v).slice(1));
        return omitFirstNumber <= 26 || omitFirstNumber === 0;
      },
      message: 'Invalid room number, there are only 26 rooms per floor.',
    },
  },
  bedType: {
    type: String,
    enum: ['single', 'double', 'queen-size', 'king-size'],
    required: [true, 'Room must have a bed type.'],
    validate: {
      validator: function (this: RoomDocument, v: RoomDocument['bedType']) {
        if (this.type === 'loft-single' && v !== 'single') {
          return false;
        }
      },
      message: 'Room of type "Loft single" can only have a single bed.',
    },
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  price: {
    type: Number,
    min: 0,
    required: [true, 'Room must have a price.'],
  },
  images: [String],
});

const Room = model('Room', roomSchema);
