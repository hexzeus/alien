import pool from '../config/database';

export const createReviewTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      place_name VARCHAR(255) NOT NULL,
      comment TEXT NOT NULL,
      rating_overall INTEGER,
      rating_cleanliness INTEGER,
      rating_comfort INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
    await pool.query(query);
};
