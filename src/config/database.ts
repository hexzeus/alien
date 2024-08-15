import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure that the connection string is loaded
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Connection string is set' : 'Connection string is missing');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,  // Disable SSL certificate verification (this might be necessary for Render)
    },
});

export default pool;
