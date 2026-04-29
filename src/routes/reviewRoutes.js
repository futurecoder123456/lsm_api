import express from 'express';
import prisma from '../config/db.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

import {
  validateReviewId,
  validateCreateReview,
  validateUpdateReview,
} from '../middleware/reviewValidators.js';

import {
  getAllReviewsController,
  getReviewByIdController,
  createReviewController,
  updateReviewController,
  deleteReviewController,
} from '../controllers/reviewController.js';

const router = express.Router();

/* --------------------
   PUBLIC ROUTES
-------------------- */
router.get('/', getAllReviewsController);

router.get('/:id', validateReviewId, getReviewByIdController);

/* --------------------
   AUTHENTICATED ROUTES
-------------------- */
router.post(
  '/',
  authenticate,
  validateCreateReview,
  createReviewController
);

/* --------------------
   OWNER-ONLY ROUTES
-------------------- */

// UPDATE REVIEW
router.put(
  '/:id',
  authenticate,
  validateReviewId,
  authorizeOwnership(async (req) => {
    const review = await prisma.review.findUnique({
      where: { reviewId: Number(req.params.id) },
    });

    return review?.userId;
  }),
  validateUpdateReview,
  updateReviewController
);

// DELETE REVIEW
router.delete(
  '/:id',
  authenticate,
  validateReviewId,
  authorizeOwnership(async (req) => {
    const review = await prisma.review.findUnique({
      where: { reviewId: Number(req.params.id) },
    });

    return review?.userId;
  }),
  deleteReviewController
);

export default router;