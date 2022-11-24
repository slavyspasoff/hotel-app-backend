import { Router } from 'express';

import {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/review.controller.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(createReview);
router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

export { router as default };
