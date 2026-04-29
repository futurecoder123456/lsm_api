import prisma from '../config/db.js';

// --------------------
// GET ALL REVIEWS
// --------------------
export async function getAllReviewsController(req, res, next) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
        book: true,
      },
    });

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
}

// --------------------
// GET REVIEW BY ID
// --------------------
export async function getReviewByIdController(req, res, next) {
  try {
    const { reviewId } = req.params;

    const review = await prisma.review.findUnique({
      where: { reviewId: Number(reviewId) },
      include: {
        user: true,
        book: true,
      },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
}

// --------------------
// CREATE REVIEW
// --------------------
export async function createReviewController(req, res, next) {
  try {
    const { userId, bookId, rating, reviewText } = req.body;

    const review = await prisma.review.create({
      data: {
        userId: Number(userId),
        bookId: Number(bookId),
        rating: Number(rating),
        reviewText,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
}

// --------------------
// UPDATE REVIEW
// --------------------
export async function updateReviewController(req, res, next) {
  try {
    const { reviewId } = req.params;
    const { rating, reviewText } = req.body;

    const review = await prisma.review.findUnique({
      where: { reviewId: Number(reviewId) },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const updatedReview = await prisma.review.update({
      where: { reviewId: Number(reviewId) },
      data: {
        ...(rating && { rating: Number(rating) }),
        ...(reviewText && { reviewText }),
        updatedAt: new Date(),
      },
    });

    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
}

// --------------------
// DELETE REVIEW
// --------------------
export async function deleteReviewController(req, res, next) {
  try {
    const { reviewId } = req.params;

    const review = await prisma.review.findUnique({
      where: { reviewId: Number(reviewId) },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await prisma.review.delete({
      where: { reviewId: Number(reviewId) },
    });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    next(err);
  }
}