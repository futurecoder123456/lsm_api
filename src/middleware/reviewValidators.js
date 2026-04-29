import { param, body, oneOf } from 'express-validator';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

// --------------------
// REVIEW ID (param)
// --------------------
export const validateReviewId = [
  param('reviewId')
    .trim()
    .isInt({ min: 1 })
    .withMessage('Review ID must be a positive integer'),

  handleValidationErrors,
];

// --------------------
// CREATE REVIEW
// --------------------
export const validateCreateReview = [
  body('userId')
    .exists({ values: 'falsy' })
    .withMessage('User ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),

  body('bookId')
    .exists({ values: 'falsy' })
    .withMessage('Book ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Book ID must be a positive integer'),

  body('rating')
    .exists({ values: 'falsy' })
    .withMessage('Rating is required')
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('reviewText')
    .exists({ values: 'falsy' })
    .withMessage('Review text is required')
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Review text must be at least 3 characters'),

  handleValidationErrors,
];

// --------------------
// UPDATE REVIEW
// --------------------
export const validateUpdateReview = [
  oneOf(
    [
      body('rating').exists({ values: 'falsy' }),
      body('reviewText').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (rating, reviewText) must be provided' }
  ),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('reviewText')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Review text must be at least 3 characters'),

  handleValidationErrors,
];