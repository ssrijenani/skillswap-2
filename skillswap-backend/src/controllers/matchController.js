import * as matchService from '../services/matchService.js';

export function getMatchesForUser(req, res, next) {
  try {
    const matches = matchService.getMatchesForUser(req.params.userId);
    res.json({ data: matches, count: matches.length });
  } catch (err) {
    next(err);
  }
}

export function requestSession(req, res, next) {
  try {
    const { matchId } = req.params;
    const result = matchService.requestSession(matchId);
    res.status(201).json({ data: result });
  } catch (err) {
    next(err);
  }
}

export function generateMatches(req, res, next) {
  try {
    const { userId } = req.params;
    const matches = matchService.generateMatches(userId);
    res.json({
      data: matches,
      count: matches.length,
      message: `Generated ${matches.length} matches for user ${userId}`,
    });
  } catch (err) {
    next(err);
  }
}
