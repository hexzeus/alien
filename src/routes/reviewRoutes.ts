import { Router } from 'express';
import { createReview, getReviews, getReviewById, updateReview, deleteReview } from '../controllers/reviewController';

const router = Router();

// POST: Create a new review
router.post('/', createReview);

// GET: Fetch all reviews
router.get('/', getReviews);

// GET: Fetch a single review by ID
router.get('/:id', getReviewById);

// PUT: Update a review by ID
router.put('/:id', updateReview);

// DELETE: Delete a review by ID
router.delete('/:id', deleteReview);

export default router;
