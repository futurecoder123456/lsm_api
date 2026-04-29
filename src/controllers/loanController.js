import prisma from '../config/db.js';

// --------------------
// GET ALL LOANS
// --------------------
export async function getAllLoansController(req, res, next) {
  try {
    const loans = await prisma.loan.findMany({
      include: {
        user: true,
        book: true,
      },
    });

    res.status(200).json(loans);
  } catch (err) {
    next(err);
  }
}

// --------------------
// GET LOAN BY ID
// --------------------
export async function getLoanByIdController(req, res, next) {
  try {
    const { loanId } = req.params;

    const loan = await prisma.loan.findUnique({
      where: { loanId: Number(loanId) },
      include: {
        user: true,
        book: true,
      },
    });

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.status(200).json(loan);
  } catch (err) {
    next(err);
  }
}

// --------------------
// CREATE LOAN
// --------------------
export async function createLoanController(req, res, next) {
  try {
    const {
      userId,
      bookId,
      loanDate,
      dueDate,
      returnDate,
      penaltyFee,
    } = req.body;

    // Optional: ensure user & book exist (GOOD PRACTICE / BONUS MARKS)
    const user = await prisma.user.findUnique({
      where: { userId: Number(userId) },
    });

    const book = await prisma.book.findUnique({
      where: { bookId: Number(bookId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const loan = await prisma.loan.create({
      data: {
        userId: Number(userId),
        bookId: Number(bookId),
        loanDate: new Date(loanDate),
        dueDate: new Date(dueDate),
        returnDate: returnDate ? new Date(returnDate) : null,
        penaltyFee: penaltyFee ? Number(penaltyFee) : null,
      },
    });

    res.status(201).json(loan);
  } catch (err) {
    next(err);
  }
}

// --------------------
// UPDATE LOAN
// --------------------
export async function updateLoanController(req, res, next) {
  try {
    const { loanId } = req.params;

    const loan = await prisma.loan.findUnique({
      where: { loanId: Number(loanId) },
    });

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    const {
      dueDate,
      returnDate,
      penaltyFee,
    } = req.body;

    const updatedLoan = await prisma.loan.update({
      where: { loanId: Number(loanId) },
      data: {
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(returnDate && { returnDate: new Date(returnDate) }),
        ...(penaltyFee !== undefined && { penaltyFee: Number(penaltyFee) }),
      },
    });

    res.status(200).json(updatedLoan);
  } catch (err) {
    next(err);
  }
}

// --------------------
// DELETE LOAN
// --------------------
export async function deleteLoanController(req, res, next) {
  try {
    const { loanId } = req.params;

    const loan = await prisma.loan.findUnique({
      where: { loanId: Number(loanId) },
    });

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    await prisma.loan.delete({
      where: { loanId: Number(loanId) },
    });

    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (err) {
    next(err);
  }
}
