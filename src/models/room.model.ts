import { Schema, model } from 'mongoose';
import {
  type RoomDocument,
  type RoomModel,
  type RoomMethods,
} from '../types/room.types.js';

const roomNumberValidator = {
  validator: function (this: RoomDocument, v: number) {
    const omitFirstNumber = Number(String(v).slice(1));
    return omitFirstNumber <= 26 && omitFirstNumber !== 0;
  },
  message: 'Invalid room number, there are only 26 rooms per floor.',
};

const bedTypeValidators = [
  {
    validator: function (this: RoomDocument, v: RoomDocument['bedType']) {
      if (this.type === 'loft-single' && v !== 'single') {
        return false;
      }
    },
    message: 'Room of type Loft single can only have a single bed.',
  },
  {
    validator: function (this: RoomDocument, v: RoomDocument['bedType']) {
      if (this.type === 'loft-double' && v !== 'double') {
        return false;
      }
    },
    message: 'Room of type Loft double can only have a double bed.',
  },
];

const roomSchema = new Schema<RoomDocument, RoomModel, RoomMethods>({
  type: {
    type: String,
    enum: ['loft-single', 'loft-double', 'big-room', 'apartment'],
    required: [true, 'Room must have a type.'],
  },
  number: {
    type: Number,
    min: 101,
    max: 426,
    unique: true,
    validate: roomNumberValidator,
  },
  bedType: {
    type: String,
    enum: ['single', 'double', 'queen-size', 'king-size'],
    required: [true, 'Room must have a bed type.'],
    validate: bedTypeValidators,
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

const Room = model<RoomDocument, RoomModel>('Room', roomSchema);

//TODO: Attach the room document to the request and validate the bed type on find, since the `this` keyword points to the query

export { Room as default };
