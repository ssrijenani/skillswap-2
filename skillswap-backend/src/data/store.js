import { seedUsers, seedMatches, seedSessions } from './seed.js';

const store = {
  users: seedUsers.map((u) => ({ ...u })),
  matches: seedMatches.map((m) => ({ ...m })),
  sessions: seedSessions.map((s) => ({ ...s })),
};

export default store;

export function findById(collection, id) {
  return store[collection].find((item) => item.id === id);
}

export function findWhere(collection, predicate) {
  return store[collection].filter(predicate);
}

export function insertOne(collection, record) {
  store[collection].push(record);
  return record;
}

export function updateById(collection, id, patch) {
  const index = store[collection].findIndex((item) => item.id === id);
  if (index === -1) return null;
  store[collection][index] = { ...store[collection][index], ...patch };
  return store[collection][index];
}

export function deleteById(collection, id) {
  const before = store[collection].length;
  store[collection] = store[collection].filter((item) => item.id !== id);
  return store[collection].length < before;
}
