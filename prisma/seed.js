import 'dotenv/config';
import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

async function main() {
  try {
    console.log('Starting seed...');

    await prisma.$executeRawUnsafe(`
      TRUNCATE TABLE "Review", "Loan", "User", "Book" RESTART IDENTITY CASCADE;
    `);

    // --------------------
    // Seed Books
    // --------------------
    await prisma.book.createMany({
      data: [
        {
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          publishDate: new Date('1937-09-21'),
          pageAmount: 310,
          conditionReport: 'Good',
          timesLoaned: 12,
        },
        {
          title: '1984',
          author: 'George Orwell',
          publishDate: new Date('1949-06-08'),
          pageAmount: 328,
          conditionReport: 'Fair',
          timesLoaned: 19,
        },
        {
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          publishDate: new Date('1813-01-28'),
          pageAmount: 279,
          conditionReport: 'Very Good',
          timesLoaned: 8,
        },
      ],
    });

    // --------------------
    // Seed Users
    // --------------------
    const alicePassword = await bcrypt.hash('alice123', 10);
    const brianPassword = await bcrypt.hash('brian123', 10);
    const catherinePassword = await bcrypt.hash('catherine123', 10);

    await prisma.user.createMany({
      data: [
        {
          name: 'Alice Johnson',
          email: 'alice@example.com',
          password: alicePassword,
          role: 'USER',
          dateJoined: new Date('2024-01-15'),
          userDob: new Date('1998-05-20'),
          feesPaid: 12.5,
          booksLoaned: 2,
        },
        {
          name: 'Brian Smith',
          email: 'brian@example.com',
          password: brianPassword,
          role: 'ADMIN',
          dateJoined: new Date('2024-03-10'),
          userDob: new Date('1995-11-02'),
          feesPaid: 0,
          booksLoaned: 1,
        },
        {
          name: 'Catherine Lee',
          email: 'catherine@example.com',
          password: catherinePassword,
          role: 'USER',
          dateJoined: new Date('2024-05-05'),
          userDob: new Date('2000-07-17'),
          feesPaid: 5,
          booksLoaned: 3,
        },
      ],
    }); 

    const allBooks = await prisma.book.findMany();
    const allUsers = await prisma.user.findMany();
    // --------------------
    // Seed Reviews
    // --------------------
    await prisma.review.createMany({
      data: [
        {
          userId: allUsers[0].userId,
          bookId: allBooks[0].bookId,
          rating: 5,
          reviewText: 'Amazing fantasy adventure.',
          createdAt: new Date('2026-04-10'),
          updatedAt: new Date('2026-04-11'),
        },
        {
          userId: allUsers[1].userId,
          bookId: allBooks[1].bookId,
          rating: 4,
          reviewText: 'Very thought-provoking.',
          createdAt: new Date('2026-04-12'),
          updatedAt: new Date('2026-04-12'),
        },
        {
          userId: allUsers[2].userId,
          bookId: allBooks[2].bookId,
          rating: 5,
          reviewText: 'Loved the writing style.',
          createdAt: new Date('2026-04-15'),
          updatedAt: new Date('2026-04-16'),
        },
      ],
    });

    // --------------------
    // Seed Loans
    // --------------------
    await prisma.loan.createMany({
      data: [
        {
          userId: allUsers[0].userId,
          bookId: allBooks[0].bookId,
          loanDate: new Date('2026-04-01'),
          dueDate: new Date('2026-04-15'),
        },
        {
          userId: allUsers[1].userId,
          bookId: allBooks[1].bookId,
          loanDate: new Date('2026-03-10'),
          dueDate: new Date('2026-03-24'),
          returnDate: new Date('2026-03-20'),
          penaltyFee: 0,
        },
        {
          userId: allUsers[2].userId,
          bookId: allBooks[2].bookId,
          loanDate: new Date('2026-03-01'),
          dueDate: new Date('2026-03-15'),
          returnDate: new Date('2026-03-22'),
          penaltyFee: 3.5,
        },
      ],
    });

    console.log('Seed complete.');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();