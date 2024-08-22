import { Router } from 'express';
import { getReviewStats } from '../controllers/reviewController';  // Adjust import paths as needed

const router = Router();

// Define route to get review stats
router.get('/stats', getReviewStats);

export default router;
