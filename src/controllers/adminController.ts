import { Request, Response } from 'express';
import pool from '../config/database';

// Get review stats for the admin dashboard
export const getReviewStats = async (req: Request, res: Response) => {
    try {
        const totalReviewsResult = await pool.query('SELECT COUNT(*) FROM reviews');
        const totalReviews = parseInt(totalReviewsResult.rows[0].count);

        const averageRatingResult = await pool.query('SELECT AVG(rating_overall) FROM reviews');
        const averageRating = parseFloat(averageRatingResult.rows[0].avg).toFixed(2);

        // Log flagged query to debug
        const flaggedReviewsResult = await pool.query('SELECT COUNT(*) FROM reviews WHERE flagged = TRUE');
        console.log('Flagged reviews result:', flaggedReviewsResult);  // Log this for debugging
        const flaggedReviews = parseInt(flaggedReviewsResult.rows[0].count);

        res.status(200).json({
            totalReviews,
            averageRating,
            flaggedReviews,
        });
    } catch (error) {
        handleServerError(error, res, 'Error fetching review stats');
    }
};

// Get all reviews for admin
export const getAllReviewsForAdmin = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        handleServerError(error, res, 'Error fetching reviews for admin');
    }
};

// Update the review status (approve/reject)
export const updateReviewStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const query = `
      UPDATE reviews
      SET status = $1
      WHERE id = $2 RETURNING *;
    `;
        const values = [status, id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        handleServerError(error, res, 'Error updating review status');
    }
};

// Central error handling function
const handleServerError = (error: unknown, res: Response, message: string) => {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error('An unexpected error occurred:', error);
    }
    res.status(500).json({ message });
};
