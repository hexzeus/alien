import { Request, Response } from 'express';
import pool from '../config/database';

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { place_name, comment, rating_overall, rating_cleanliness, rating_comfort } = req.body;
    const query = `
      INSERT INTO reviews (place_name, comment, rating_overall, rating_cleanliness, rating_comfort)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [place_name, comment, rating_overall, rating_cleanliness, rating_comfort];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating review' });
  }
};

// Fetch all reviews
export const getReviews = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM reviews');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

// Fetch a single review by ID
export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching review' });
  }
};

// Update a review by ID
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { place_name, comment, rating_overall, rating_cleanliness, rating_comfort } = req.body;
    const query = `
      UPDATE reviews
      SET place_name = $1, comment = $2, rating_overall = $3, rating_cleanliness = $4, rating_comfort = $5
      WHERE id = $6 RETURNING *;
    `;
    const values = [place_name, comment, rating_overall, rating_cleanliness, rating_comfort, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating review' });
  }
};

// Delete a review by ID
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting review' });
  }
};
