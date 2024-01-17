import jwt from 'jsonwebtoken';
import { parseCookies } from '../utils/utils.js';

export const checkAuth = (req, res, next) => {
  const { access, refresh } = parseCookies(req.header.cookie);

  if (!access) {
    return res.sendStatus(401);
  }

  jwt.verify(access, process.env.ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;

    next();
  });
};
