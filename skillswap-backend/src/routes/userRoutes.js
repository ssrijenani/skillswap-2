import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
} from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);

export default router;
