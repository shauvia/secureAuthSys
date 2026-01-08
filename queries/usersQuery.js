import { query } from '../db.js';

// Register query - check if user exists and create new user
export const checkUserExists = async (email) => {
  const result = await query('SELECT id FROM users WHERE email = $1', [email]);
  return result.rows.length > 0;
};

export const registerUser = async (email, hashedPassword, role) => {
  await query(
    'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)',
    [email, hashedPassword, role]
  );
};

// Login query - find user with password for authentication
export const getUserForLogin = async (email) => {
  const result = await query(
    'SELECT id, email, password, role FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};
