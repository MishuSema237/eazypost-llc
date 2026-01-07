import { User, UserInput } from '../types/user';

const API_BASE = process.env.REACT_APP_API_URL || '';
const API_URL = `${API_BASE}/api/users`;

export type { User, UserInput };

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    return [];
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const createUser = async (userData: UserInput): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }
  return await response.json();
};

export const updateUser = async (userId: string, userData: Partial<UserInput>): Promise<User> => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user');
  }
  return await response.json();
};

export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
};

export const validateUser = async (email: string, password: string): Promise<User | null> => {
  const response = await fetch(`${API_URL}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) return null;
  return await response.json();
};

export const updateUserPermissions = async (userId: string, permissions: string[]): Promise<void> => {
  const response = await fetch(`${API_URL}/${userId}/permissions`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ permissions }),
  });

  if (!response.ok) throw new Error('Failed to update permissions');
};
