// src/repositories/userRepo.js
import prisma from '../config/db.js';

export async function getAll() {
  return prisma.user.findMany({
    include: {
      reviews: true,
      loans: true
    }
  });
}

export async function getById(id) {
  return prisma.user.findUnique({
    where: { userId: Number(id) },
    include: {
      reviews: true,
      loans: true
    }
  });
}

export async function create(data) {
  return prisma.user.create({
    data
  });
}

export async function update(id, data) {
  return prisma.user.update({
    where: { userId: Number(id) },
    data
  });
}

export async function remove(id) {
  return prisma.user.delete({
    where: { userId: Number(id) }
  });
}