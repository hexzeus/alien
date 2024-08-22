import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import reviewRoutes from './routes/reviewRoutes';
import adminRoutes from './routes/adminRoutes';  // Don't forget to import your admin routes
import { createReviewTable } from './models/reviewModel';

const app = express();
const PORT = process.env.PORT || 5000;

// Apply Helmet with more secure CSP
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", "http://localhost:3000", "http://localhost:5000", "https://alienbathreview.vercel.app"], // Allow your local and production frontends
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                imgSrc: ["'self'", "data:"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5000", "https://alienbathreview.vercel.app"], // Allow local and production frontends for API calls
            },
        },
        crossOriginEmbedderPolicy: false,
    })
);

// Enable CORS to allow requests from both local and production frontends
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://alienbathreview.vercel.app', 'http://localhost:5000'], // Allow both local and production frontends
        credentials: true, // Allow credentials like cookies to be sent if needed
    })
);

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Register review routes
app.use('/api/reviews', reviewRoutes);

// Register admin routes
app.use('/api/admin', adminRoutes);  // Make sure your admin routes are registered here

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Review API');
});

// Create review table
createReviewTable().then(() => {
    console.log("Review table created successfully.");
}).catch((error) => {
    console.error("Error creating review table:", error);
});

// Catch-all route handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
