import { Router } from 'express';
import { createReview, getReviews, getReviewById, updateReview, deleteReview } from '../controllers/reviewController';

const router = Router();

// User routes
router.post('/', createReview);
router.get('/', getReviews);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
