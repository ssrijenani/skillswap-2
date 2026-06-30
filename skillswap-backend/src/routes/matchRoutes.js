import { Router } from 'express';
import {
  getMatchesForUser,
  requestSession,
  generateMatches,
} from '../controllers/matchController.js';

const router = Router();

router.post('/generate/:userId', generateMatches);
router.get('/:userId', getMatchesForUser);
router.post('/:matchId/request', requestSession);

export default router;
