import express from 'express';
import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController
} from '../controllers/bookController.js';

import { authenticate } from '../middleware/authenticate.js';
import {
  validateBookId,
  validateCreateBook,
  validateUpdateBook
} from '../middleware/bookValidators.js';

const router = express.Router();

// Public
router.get('/', getAllBooksController);
router.get('/:id', validateBookId, getBookByIdController);

//for admin
router.post('/', authenticate, validateCreateBook, createBookController);

router.put('/:id', authenticate, validateBookId, validateUpdateBook, updateBookController);

router.delete('/:id', authenticate, validateBookId, deleteBookController);

export default router;