import bcrypt from 'bcryptjs';  // bcryptjs for compatibility with Next.js
import jwt from 'jsonwebtoken';
import { query } from './db';

const secretKey = process.env.JWT_SECRET!;

// Define the types for the user roles
interface User {
  AdminID?: number;
  InstructorID?: number;
  ClientID?: number;
  password: string;
}

export async function authenticate(email: string, password: string, role: 'admin' | 'instructor' | 'client') {
  console.log('Authenticating user with email:', email, 'and role:', role);

  // Convert the role to lowercase and assert that it is a valid key
  const roleLower = role.toLowerCase() as 'admin' | 'instructor' | 'client';
  
  // Map roles to respective table names
  const tables: Record<'admin' | 'instructor' | 'client', string> = {
    admin: 'Admin',
    instructor: 'Instructors',
    client: 'Clients',
  };

  const table = tables[roleLower];
  console.log('Table to query:', table);

  // If the table is undefined, return an error
  if (!table) {
    console.error('Invalid role provided:', role);
    return null;
  }

  // Define the SQL query to select the user by email
  const result = await query<User>(`SELECT * FROM ${table} WHERE Email = $1`, [email]);
  const user = result[0];  // Get the first row

  console.log('User fetched from DB:', user);

  // If no user found in the specified table
  if (!user) {
    console.log('No user found for the given email');
    return null;
  }

  console.log('Password from request:', password);
  console.log('Password from DB:', user.password);

  // Compare the provided password with the stored hashed password
  if (!await bcrypt.compare(password, user.password)) {
    console.log('Password comparison failed');
    return null;
  }

  // Prepare the payload for the JWT token
  const payload = {
    userId: user.AdminID || user.InstructorID || user.ClientID,
    role
  };

  // Sign the token with a secret and set expiration
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

export function verifyToken(token: string) {
  try {
    // Verify the token using the secret key
    return jwt.verify(token, secretKey) as { userId: number; role: string };
  } catch {
    return null;
  }
}
