import { body, param, oneOf } from 'express-validator';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

// --------------------
// Loan ID (param)
// --------------------
export const validateLoanId = [
  param('loanId')
    .trim()
    .isInt({ min: 1 })
    .withMessage('Loan ID must be a positive integer'),

  handleValidationErrors,
];

// --------------------
// CREATE LOAN
// --------------------
export const validateCreateLoan = [
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

  body('loanDate')
    .exists({ values: 'falsy' })
    .withMessage('Loan date is required')
    .bail()
    .isISO8601()
    .withMessage('Loan date must be a valid date'),

  body('dueDate')
    .exists({ values: 'falsy' })
    .withMessage('Due date is required')
    .bail()
    .isISO8601()
    .withMessage('Due date must be a valid date'),

  body('returnDate')
    .optional()
    .isISO8601()
    .withMessage('Return date must be a valid date'),

  body('penaltyFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Penalty fee must be a non-negative number'),

  handleValidationErrors,
];

// --------------------
// UPDATE LOAN
// --------------------
export const validateUpdateLoan = [
  oneOf(
    [
      body('dueDate').exists({ values: 'falsy' }),
      body('returnDate').exists({ values: 'falsy' }),
      body('penaltyFee').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field must be provided to update' }
  ),

  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),

  body('returnDate')
    .optional()
    .isISO8601()
    .withMessage('Return date must be a valid date'),

  body('penaltyFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Penalty fee must be a non-negative number'),

  handleValidationErrors,
];