import { Router } from 'express';
import { getAllReviewsForAdmin, getReviewStats, updateReviewStatus } from '../controllers/adminController';

const adminRouter = Router();

// Admin routes
adminRouter.get('/reviews', getAllReviewsForAdmin);
adminRouter.get('/stats', getReviewStats);
adminRouter.put('/review/:id/status', updateReviewStatus); // Route to approve/reject reviews

export default adminRouter;
