import prisma from '../config/db.js';

// --------------------
// GET ALL BOOKS
// --------------------
export async function getAllBooksController(req, res, next) {
  try {
    const books = await prisma.book.findMany({
      include: {
        reviews: true,
        loans: true,
      },
    });

    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
}

// --------------------
// GET BOOK BY ID
// --------------------
export async function getBookByIdController(req, res, next) {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.findUnique({
      where: { bookId: Number(bookId) },
      include: {
        reviews: true,
        loans: true,
      },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
}

// --------------------
// CREATE BOOK
// --------------------
export async function createBookController(req, res, next) {
  try {
    const {
      title,
      author,
      publishDate,
      pageAmount,
      conditionReport,
      timesLoaned,
    } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        publishDate: new Date(publishDate),
        pageAmount: Number(pageAmount),
        conditionReport,
        timesLoaned: timesLoaned ? Number(timesLoaned) : 0,
      },
    });

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

// --------------------
// UPDATE BOOK
// --------------------
export async function updateBookController(req, res, next) {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.findUnique({
      where: { bookId: Number(bookId) },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const {
      title,
      author,
      publishDate,
      pageAmount,
      conditionReport,
      timesLoaned,
    } = req.body;

    const updatedBook = await prisma.book.update({
      where: { bookId: Number(bookId) },
      data: {
        ...(title && { title }),
        ...(author && { author }),
        ...(publishDate && { publishDate: new Date(publishDate) }),
        ...(pageAmount && { pageAmount: Number(pageAmount) }),
        ...(conditionReport && { conditionReport }),
        ...(timesLoaned !== undefined && {
          timesLoaned: Number(timesLoaned),
        }),
      },
    });

    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
}

// --------------------
// DELETE BOOK
// --------------------
export async function deleteBookController(req, res, next) {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.findUnique({
      where: { bookId: Number(bookId) },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await prisma.book.delete({
      where: { bookId: Number(bookId) },
    });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
}