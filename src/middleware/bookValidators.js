import { body, param, oneOf, query } from 'express-validator';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

// --------------------
// BOOK ID (param)
// --------------------
export const validateBookId = [
  param('bookId')
    .trim()
    .isInt({ min: 1 })
    .withMessage('Book ID must be a positive integer'),

  handleValidationErrors,
];

// --------------------
// CREATE BOOK
// --------------------
export const validateCreateBook = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title cannot be empty'),

  body('author')
    .exists({ values: 'falsy' })
    .withMessage('Author is required')
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Author cannot be empty'),

  body('publishDate')
    .exists({ values: 'falsy' })
    .withMessage('Publish date is required')
    .bail()
    .isISO8601()
    .withMessage('Publish date must be a valid date'),

  body('pageAmount')
    .exists({ values: 'falsy' })
    .withMessage('Page amount is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Page amount must be a positive integer'),

  body('conditionReport')
    .exists({ values: 'falsy' })
    .withMessage('Condition report is required')
    .bail()
    .trim()
    .isString()
    .withMessage('Condition report must be a string'),

  body('timesLoaned')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Times loaned must be a non-negative integer'),

  handleValidationErrors,
];

// --------------------
// UPDATE BOOK
// --------------------
export const validateUpdateBook = [
  oneOf(
    [
      body('title').exists({ values: 'falsy' }),
      body('author').exists({ values: 'falsy' }),
      body('publishDate').exists({ values: 'falsy' }),
      body('pageAmount').exists({ values: 'falsy' }),
      body('conditionReport').exists({ values: 'falsy' }),
      body('timesLoaned').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field must be provided to update' }
  ),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title cannot be empty'),

  body('author')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Author cannot be empty'),

  body('publishDate')
    .optional()
    .isISO8601()
    .withMessage('Publish date must be a valid date'),

  body('pageAmount')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page amount must be a positive integer'),

  body('conditionReport')
    .optional()
    .trim()
    .isString()
    .withMessage('Condition report must be a string'),

  body('timesLoaned')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Times loaned must be a non-negative integer'),

  handleValidationErrors,
];

// --------------------
// BOOK QUERY (for GET /books)
// --------------------
export const validateBookQuery = [
  query('sortBy')
    .optional()
    .isIn(['bookId', 'title', 'author', 'publishDate', 'pageAmount', 'timesLoaned'])
    .withMessage('Invalid sort field'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be asc or desc'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer'),

  handleValidationErrors,
];