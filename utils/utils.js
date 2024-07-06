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
 * Finds the query type that matches the values of the given array. The
 *   order of the values in `pattern` is `acctId`, `codeId`, `month` and
 *   `year`.
 * @param {boolean[]} currentPattern 
 * @returns {string}
 */
export const getQueryType = (currentPattern) => {
  const patterns = [
    {
      name: "A",
      pattern: [false, false, false, false]
    },
    {
      name: "B",
      pattern: [true, false, false, false]
    },
    {
      name: "C",
      pattern: [true, true, false, false]
    },
    {
      name: "D",
      pattern: [true, true, true, false]
    },
    {
      name: "E",
      pattern: [false, true, false, false]
    },
    {
      name: "F",
      pattern: [false, true, true, false]
    },
    {
      name: "G",
      pattern: [false, true, true, true]
    },
    {
      name: "H",
      pattern: [false, false, true, false]
    },
    {
      name: "I",
      pattern: [false, false, true, true]
    },
    {
      name: "J",
      pattern: [true, false, true, true]
    },
    {
      name: "K",
      pattern: [false, false, false, true]
    },
    {
      name: "L",
      pattern: [true, false, false, true]
    },
    {
      name: "M",
      pattern: [true, true, false, true]
    },
    {
      name: "N",
      pattern: [true, true, true, true]
    }
  ];

  const match = patterns.find((x) => x.pattern.every((val, i) => val === currentPattern[i]));
  return match.name;
};
