import { Router } from 'express';
import { createReview, getReviews, getReviewById, updateReview, deleteReview, getReviewStats } from '../controllers/reviewController';

const router = Router();

router.post('/', createReview);
router.get('/', getReviews);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

// Admin routes
router.get('/admin/stats', getReviewStats); // Add this line

export default router;
