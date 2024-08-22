import pool from '../config/database';

export const createReviewTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      place_name VARCHAR(255) NOT NULL,
      comment TEXT NOT NULL,
      rating_overall INTEGER CHECK (rating_overall BETWEEN 1 AND 5),
      rating_cleanliness INTEGER CHECK (rating_cleanliness BETWEEN 1 AND 5),
      rating_comfort INTEGER CHECK (rating_comfort BETWEEN 1 AND 5),
      flagged BOOLEAN DEFAULT FALSE,
      status VARCHAR(20) DEFAULT 'pending',
      latitude DECIMAL(10, 7),
      longitude DECIMAL(10, 7),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(query);
};
