import express from 'express';
import reviewRoutes from './routes/reviewRoutes';
import adminRoutes from './routes/adminRoutes';  // Import admin routes
import { createReviewTable } from './models/reviewModel';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Register the review routes
app.use('/api/reviews', reviewRoutes);

// Register the admin routes
app.use('/api/admin', adminRoutes);

// Create the reviews table if it doesn't exist
createReviewTable().then(() => {
    console.log("Review table created successfully.");
}).catch((error) => {
    console.error("Error creating review table:", error);
});

export default app;
