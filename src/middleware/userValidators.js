import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

/* --------------------
   VALIDATE USER ID (PARAM)
-------------------- */
export const validateUserId = [
  param('id')
    .trim()
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),

  handleValidationErrors,
];

/* --------------------
   SIGN UP VALIDATION
-------------------- */
export const validateSignUp = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must be 50 characters or less'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be 8–64 characters'),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be USER or ADMIN'),

  body('dateJoined')
    .optional()
    .isISO8601()
    .withMessage('dateJoined must be a valid date'),

  body('userDob')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('userDob must be a valid date'),

  body('feesPaid')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('feesPaid must be a positive number'),

  body('booksLoaned')
    .optional()
    .isInt({ min: 0 })
    .withMessage('booksLoaned must be a non-negative integer'),

  handleValidationErrors,
];

/* --------------------
   LOGIN VALIDATION
-------------------- */
export const validateLogIn = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),

  handleValidationErrors,
];

/* --------------------
   UPDATE USER (PARTIAL)
-------------------- */
export const validateUpdateUser = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Name must be 50 characters or less'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email is not valid')
    .normalizeEmail(),

  body('password')
    .optional()
    .trim()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be 8–64 characters'),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be USER or ADMIN'),

  body('feesPaid')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('feesPaid must be a positive number'),

  body('booksLoaned')
    .optional()
    .isInt({ min: 0 })
    .withMessage('booksLoaned must be a non-negative integer'),

  handleValidationErrors,
];