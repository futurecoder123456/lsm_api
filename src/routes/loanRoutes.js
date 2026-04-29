import express from 'express';
import prisma from '../config/db.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

import {
  validateLoanId,
  validateCreateLoan,
  validateUpdateLoan
} from '../middleware/loanValidators.js';

import {
  getAllLoansController,
  getLoanByIdController,
  createLoanController,
  updateLoanController,
  deleteLoanController
} from '../controllers/loanController.js';

const router = express.Router();

// Public (or authenticated only depending on requirement)
router.get('/', authenticate, getAllLoansController);

router.get('/:id', authenticate, validateLoanId, getLoanByIdController);

// Create loan
router.post('/', authenticate, validateCreateLoan, createLoanController);

// UPDATE (owner only)
router.put(
  '/:id',
  authenticate,
  validateLoanId,
  authorizeOwnership(async (req) => {
    const loan = await prisma.loan.findUnique({
      where: { loanId: Number(req.params.id) }
    });

    return loan?.userId;
  }),
  validateUpdateLoan,
  updateLoanController
);

// DELETE (owner only)
router.delete(
  '/:id',
  authenticate,
  validateLoanId,
  authorizeOwnership(async (req) => {
    const loan = await prisma.loan.findUnique({
      where: { loanId: Number(req.params.id) }
    });

    return loan?.userId;
  }),
  deleteLoanController
);

export default router;