import * as userService from '../services/userService.js';

export function getAllUsers(req, res, next) {
  try {
    const users = userService.getAllUsers();
    res.json({ data: users, count: users.length });
  } catch (err) {
    next(err);
  }
}

export function getUserById(req, res, next) {
  try {
    const user = userService.getUserById(req.params.id);
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
}

export function createUser(req, res, next) {
  try {
    const { name, skillsOffered, skillsWanted } = req.body;
    const user = userService.createUser({ name, skillsOffered, skillsWanted });
    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
}

export function updateUser(req, res, next) {
  try {
    const user = userService.updateUser(req.params.id, req.body);
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
}
