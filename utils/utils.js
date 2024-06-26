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

export const prepResponseDataAfterBulkUpdate = (data) => {
  return data.map(x => ({ ...x.rows[0] }))
};

/**
 * Finds the query type that matches the values of the given array.
 * @param {boolean[]} currentPattern 
 * @returns {string}
 */
export const getQueryType = (currentPattern) => {
  const patterns = [
    {
      name: "A",
      pattern: [false, false, false]
    },
    {
      name: "B",
      pattern: [true, true, true]
    },
    {
      name: "C",
      pattern: [true, true, false]
    },
    {
      name: "D",
      pattern: [true, false, true]
    },
    {
      name: "E",
      pattern: [true, false, false]
    },
    {
      name: "F",
      pattern: [false, true, false]
    },
    {
      name: "G",
      pattern: [false, true, true]
    },
    {
      name: "H",
      pattern: [false, false, true]
    }
  ];

  const match = patterns.find((x) => x.pattern.every((val, i) => val === currentPattern[i]));
  return match.name;
};
