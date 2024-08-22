import { Router } from 'express';
import { createReview, getReviews, getAllReviewsForAdmin, getReviewById, updateReview, deleteReview, getReviewStats } from '../controllers/reviewController';

const router = Router();

router.post('/', createReview);
router.get('/', getReviews);
router.get('/:id', getReviewById);
router.get('/admin/reviews', getAllReviewsForAdmin);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

// Admin routes
router.get('/admin/stats', getReviewStats); // Add this line

export default router;
