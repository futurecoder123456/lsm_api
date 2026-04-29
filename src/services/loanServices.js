// src/services/loanServices.js
import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../repositories/loanRepo.js';

export async function getAllLoans(options) {
  return getAll(options);
}

export async function getLoanById(id) {
  const loan = await getById(id);

  if (loan) return loan;
  else {
    const error = new Error(`Loan ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createLoan(loanData) {
  return create(loanData);
}

export async function updateLoan(id, updatedData) {
  const updatedLoan = await update(id, updatedData);

  if (updatedLoan) return updatedLoan;
  else {
    const error = new Error(`Loan ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteLoan(id) {
  const result = await remove(id);

  if (result) return;
  else {
    const error = new Error(`Loan ${id} not found`);
    error.status = 404;
    throw error;
  }
}