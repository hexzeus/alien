import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import reviewRoutes from './routes/reviewRoutes';
import { createReviewTable } from './models/reviewModel';

const app = express();
const PORT = process.env.PORT || 5000;

// Apply Helmet with more secure CSP
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", "http://localhost:3000", "https://alien-bathroom-review.vercel.app", "https://alien-2q9q.onrender.com"], // Separate URLs
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                imgSrc: ["'self'", "data:"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                connectSrc: ["'self'", "http://localhost:3000", "https://alien-bathroom-review.vercel.app", "https://alien-2q9q.onrender.com"], // Separate URLs for API calls
            },
        },
        crossOriginEmbedderPolicy: false,
    })
);

// Enable CORS to allow requests from your frontend
app.use(cors({
    origin: ['http://localhost:3000', 'https://alien-bathroom-review.vercel.app/', 'https://alien-2q9q.onrender.com'], // Allow both local and production frontend URLs
    credentials: true, // Allow credentials like cookies to be sent if needed
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use review routes
app.use('/api/reviews', reviewRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Handle root route
app.get('/', (req, res) => {
    res.send('Welcome to the Review API');
});

// Create review table
createReviewTable().then(() => {
    console.log("Review table created successfully.");
});

// Catch-all route handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
