import { v4 as uuid } from 'uuid';
import store, { findById, insertOne, updateById } from '../data/store.js';

export function getAllUsers() {
  return store.users;
}

export function getUserById(id) {
  const user = findById('users', id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;
}

export function createUser({ name, skillsOffered, skillsWanted }) {
  if (!name || !skillsOffered || !skillsWanted) {
    const err = new Error('Missing required fields: name, skillsOffered, skillsWanted');
    err.status = 400;
    throw err;
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const newUser = {
    id: uuid(),
    name,
    initials,
    email: `${name.toLowerCase().replace(/\s/g, '.')}@example.com`,
    passwordHash: 'placeholder_hash',
    memberSince: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    avatarColor: 'bg-blue-600',
    skillsOffered: Array.isArray(skillsOffered) ? skillsOffered : [skillsOffered],
    skillsWanted: Array.isArray(skillsWanted) ? skillsWanted : [skillsWanted],
    createdAt: new Date().toISOString(),
  };

  return insertOne('users', newUser);
}

export function updateUser(id, patch) {
  const user = updateById('users', id, patch);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;
}
