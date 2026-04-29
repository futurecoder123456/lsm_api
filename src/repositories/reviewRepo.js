// src/repositories/reviewRepo.js
import prisma from '../config/db.js';

export async function getAll() {
  return prisma.review.findMany({
    include: {
      user: true,
      book: true
    }
  });
}

export async function getById(id) {
  return prisma.review.findUnique({
    where: { reviewId: Number(id) },
    include: {
      user: true,
      book: true
    }
  });
}

export async function create(data) {
  return prisma.review.create({
    data
  });
}

export async function update(id, data) {
  return prisma.review.update({
    where: { reviewId: Number(id) },
    data
  });
}

export async function remove(id) {
  return prisma.review.delete({
    where: { reviewId: Number(id) }
  });
}