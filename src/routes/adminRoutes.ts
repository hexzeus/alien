import { Router } from 'express';
import { getReviewStats } from '../controllers/reviewController';

const router = Router();

// Define the route for fetching review stats for the admin dashboard
router.get('/stats', getReviewStats);

export default router;
