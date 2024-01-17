import jwt from 'jsonwebtoken';

const {
  ACCESS_SECRET: as,
  REFRESH_SECRET: rs
} = process.env;

/**
 * @typedef {Object} Token
 * @property {string} accessToken
 * @property {string} refreshToken
 */

/**
 * Generates an access token as well as a refresh token.
 * @param {Object} obj
 * @param {number} obj.userId 
 * @param {string} obj.username
 * @returns {Token}
 */
export const createTokens = ({ userId, username }) => {
  const user = { userId, username }; 
  const accessToken = jwt.sign(user, as, { expiresIn: '5m' });
  const refreshToken = jwt.sign(user, rs, { expiresIn: '15m' });

  return ({ accessToken, refreshToken });
};

