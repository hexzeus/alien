import express from 'express';
import reviewRoutes from './routes/reviewRoutes';
import adminRoutes from './routes/adminRoutes';  // Import the admin routes
import { createReviewTable } from './models/reviewModel';  // Assuming this function ensures the table exists

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Register the review and admin routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);  // Register the admin routes here

// Create the reviews table if it doesn't exist
createReviewTable().then(() => {
    console.log("Review table created successfully.");
}).catch((error) => {
    console.error("Error creating review table:", error);
});

export default app;
