import * as sessionService from '../services/sessionService.js';

export function getSessionsForUser(req, res, next) {
  try {
    const sessions = sessionService.getSessionsForUser(req.params.userId);
    res.json({ data: sessions, count: sessions.length });
  } catch (err) {
    next(err);
  }
}

export function createSession(req, res, next) {
  try {
    const { userId, partnerId, topic, youTeach, theyTeach, date, time, duration } = req.body;

    if (!userId || !partnerId) {
      return res.status(400).json({ error: 'userId and partnerId are required' });
    }
    if (userId === partnerId) {
      return res.status(400).json({ error: 'userId and partnerId must be different' });
    }

    const session = sessionService.createSession({
      userId,
      partnerId,
      topic,
      youTeach,
      theyTeach,
      date,
      time,
      duration,
    });

    res.status(201).json({ data: session });
  } catch (err) {
    next(err);
  }
}

export function completeSession(req, res, next) {
  try {
    const session = sessionService.completeSession(req.params.id);
    res.json({
      data: session,
      message: 'Session marked as completed',
    });
  } catch (err) {
    next(err);
  }
}

export function cancelSession(req, res, next) {
  try {
    const result = sessionService.cancelSession(req.params.id);
    res.json({
      data: result,
      message: 'Session cancelled successfully',
    });
  } catch (err) {
    next(err);
  }
}
