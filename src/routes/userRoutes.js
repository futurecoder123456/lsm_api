import express from 'express';
import prisma from '../config/db.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController
} from '../controllers/userController.js';

import {
  validateUserId,
  validateUpdateUser
} from '../middleware/userValidators.js';

const router = express.Router();

// Public or protected depending on instructor
router.get('/', authenticate, getAllUsersController);

router.get('/:id', authenticate, validateUserId, getUserByIdController);

// OWNER ONLY (self-edit)
router.put(
  '/:id',
  authenticate,
  validateUserId,
  authorizeOwnership(async (req) => Number(req.params.id)),
  validateUpdateUser,
  updateUserController
);

// OWNER ONLY (self-delete)
router.delete(
  '/:id',
  authenticate,
  validateUserId,
  authorizeOwnership(async (req) => Number(req.params.id)),
  deleteUserController
);

export default router;