// src/repositories/bookRepo.js
import prisma from '../config/db.js';

export async function getAll() {
  return prisma.book.findMany({
    include: {
      reviews: true,
      loans: true
    }
  });
}

export async function getById(id) {
  return prisma.book.findUnique({
    where: { bookId: Number(id) },
    include: {
      reviews: true,
      loans: true
    }
  });
}

export async function create(data) {
  return prisma.book.create({
    data
  });
}

export async function update(id, data) {
  return prisma.book.update({
    where: { bookId: Number(id) },
    data
  });
}

export async function remove(id) {
  return prisma.book.delete({
    where: { bookId: Number(id) }
  });
}