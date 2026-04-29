// src/repositories/loanRepo.js
import prisma from '../config/db.js';

export async function getAll() {
  return prisma.loan.findMany({
    include: {
      user: true,
      book: true
    }
  });
}

export async function getById(id) {
  return prisma.loan.findUnique({
    where: { loanId: Number(id) },
    include: {
      user: true,
      book: true
    }
  });
}

export async function create(data) {
  return prisma.loan.create({
    data
  });
}

export async function update(id, data) {
  return prisma.loan.update({
    where: { loanId: Number(id) },
    data
  });
}

export async function remove(id) {
  return prisma.loan.delete({
    where: { loanId: Number(id) }
  });
}