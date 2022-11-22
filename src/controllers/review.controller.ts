import {} from 'express';

import catchAsync from '../utility/catchAsync';
import Review from '../models/review.model';
import {
  getOneHandler,
  updateHandler,
  deleteHandler,
} from '../utility/controllerHandlers';

//TODO: Create review controllers once i'm finished with authorization.

const getAllReviews = catchAsync(async (req, res, next) => {
  const { roomID, guestID } = req.params;
  console.table({ roomID, guestID });
  res.json({
    id: roomID || guestID,
  });
});
const getReview = getOneHandler(Review);
const createReview = catchAsync(async (req, res, next) => {
  const { roomID } = req.params;
});
const updateReview = updateHandler(Review);
const deleteReview = deleteHandler(Review);

export { getAllReviews, getReview, createReview, updateReview, deleteReview };
