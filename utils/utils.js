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
 *   order of the values in `pattern` is `acctId`, `codeId`, `fix`,
 *   `month` and `year`.
 * @param {boolean[]} currentPattern 
 * @returns {string}
 */
export const getQueryType = (currentPattern) => {
  const patterns = [
    {
      name: "A",
      pattern: [false, false, false, false, false]
    },
    {
      name: "B",
      pattern: [true, false, false, false, false]
    },
    {
      name: "C",
      pattern: [true, true, false, false, false]
    },
    {
      name: "D",
      pattern: [true, true, true, false, false]
    },
    {
      name: "E",
      pattern: [true, true, true, true, false]
    },
    {
      name: "F",
      pattern: [false, true, false, false, false]
    },
    {
      name: "G",
      pattern: [false, true, true, false, false]
    },
    {
      name: "H",
      pattern: [false, true, true, true, false]
    },
    {
      name: "I",
      pattern: [false, true, true, true, true]
    },
    {
      name: "J",
      pattern: [false, false, true, false, false]
    },
    {
      name: "K",
      pattern: [false, false, true, true, false]
    },
    {
      name: "L",
      pattern: [false, false, true, true, true]
    },
    {
      name: "M",
      pattern: [true, false, true, true, true]
    },
    {
      name: "N",
      pattern: [false, false, false, true, false]
    },
    {
      name: "O",
      pattern: [false, false, false, true, true]
    },
    {
      name: "P",
      pattern: [true, false, false, true, true]
    },
    {
      name: "Q",
      pattern: [true, true, false, true, true]
    },
    {
      name: "R",
      pattern: [false, false, false, false, true]
    },
    {
      name: "S",
      pattern: [true, false, false, false, true]
    },
    {
      name: "T",
      pattern: [true, true, false, false, true]
    },
    {
      name: "U",
      pattern: [true, true, true, false, true]
    },
    {
      name: "V",
      pattern: [true, true, true, true, true]
    }
  ];

  const match = patterns.find((x) => x.pattern.every((val, i) => val === currentPattern[i]));
  return match.name;
};

/**
 * Converts a string that can be coverted to a number greater than zero
 *   to a number.
 * @param {string} rawValue 
 * @returns {null | number}
 */
export const getQueryParamValue = (rawValue) => {
  if (typeof rawValue === "undefined" || rawValue === "0") {
    return null;
  }
  const valueAsNumber = parseInt(rawValue);
  if (isNaN(valueAsNumber)) {
    return null;
  }
  return valueAsNumber;
};