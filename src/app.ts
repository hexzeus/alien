import express from 'express';
import reviewRoutes from './routes/reviewRoutes';
import { createReviewTable } from './models/reviewModel';  // Assuming this function ensures the table exists

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Register the review routes
app.use('/api/reviews', reviewRoutes);

// Create the reviews table if it doesn't exist
createReviewTable().then(() => {
    console.log("Review table created successfully.");
}).catch((error) => {
    console.error("Error creating review table:", error);
});

export default app;
