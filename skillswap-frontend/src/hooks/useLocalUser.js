import { useState, useEffect } from 'react';

const STORAGE_KEY = 'skillswap_user';

const DEFAULT_USER = {
  name: 'Jenani',
  initials: 'J',
  memberSince: 'June 2025',
  skillsOffered: ['JavaScript', 'React', 'Node.js'],
  skillsWanted: ['UI/UX Design', 'Figma', 'Branding'],
};

export function useLocalUser() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  function updateUser(patch) {
    setUser((prev) => ({ ...prev, ...patch }));
  }

  return { user, updateUser };
}