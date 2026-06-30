import { Router } from 'express';
import {
  getSessionsForUser,
  createSession,
  completeSession,
  cancelSession,
} from '../controllers/sessionController.js';

const router = Router();

router.get('/:userId', getSessionsForUser);
router.post('/', createSession);
router.patch('/:id/complete', completeSession);
router.delete('/:id', cancelSession);

export default router;
