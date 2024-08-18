import jwt from 'jsonwebtoken';
import { DATA_FOR } from '../const/const.js';

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
 * Finds the query type that matches values of the given array. The
 *   order of the values in `pattern` is `acctId`, `codeId`, `fix`,
 *   `month` and `year`. This is fragile solution and must perfectly
 *   match the WHERE queries executed by the server in order to work as
 *   expected.
 * @todo Finish defining all the possible patterns– maybe. Doing so may
 *   be impractical
 * @param {boolean[]} currentPattern 
 * @returns {string}
 */
export const getQueryType = (currentPattern) => {
  const patterns = [
    {
      name: DATA_FOR.NO_FILTERS,
      pattern: [false, false, false, false, false]
    },
    {
      name: DATA_FOR.YEAR,
      pattern: [false, false, false, false, true]
    },
    {
      name: DATA_FOR.MONTH,
      pattern: [false, false, false, true, false]
    },
    {
      name: DATA_FOR.MONTH_YEAR,
      pattern: [false, false, false, true, true]
    },
    {
      name: DATA_FOR.FIX,
      pattern: [false, false, true, false, false]
    },
    {
      name: DATA_FOR.FIX_YEAR,
      pattern: [false, false, true, false, true]
    },
    {
      name: DATA_FOR.FIX_MONTH,
      pattern: [false, false, true, true, false]
    },
    {
      name: DATA_FOR.FIX_MONTH_YEAR,
      pattern: [false, false, true, true, true]
    },
    {
      name: DATA_FOR.CODE,
      pattern: [false, true, false, false, false]
    },
    {
      name: DATA_FOR.CODE_YEAR,
      pattern: [false, true, false, false, true]
    },
    {
      name: DATA_FOR.CODE_MONTH,
      pattern: [false, true, false, true, false]
    },
    {
      name: DATA_FOR.CODE_MONTH_YEAR,
      pattern: [false, true, false, true, true]
    },
    {
      name: DATA_FOR.CODE_FIX,
      pattern: [false, true, true, false, false]
    },
    {
      name: DATA_FOR.CODE_FIX_YEAR,
      pattern: [false, true, true, false, true]
    },
    {
      name: DATA_FOR.CODE_FIX_MONTH,
      pattern: [false, true, true, true, false]
    },
    {
      name: DATA_FOR.CODE_FIX_MONTH_YEAR,
      pattern: [false, true, true, true, true]
    },
    {
      name: DATA_FOR.ACCT,
      pattern: [true, false, false, false, false]
    },
    {
      name: DATA_FOR.ACCT_YEAR,
      pattern: [true, false, false, false, true]
    },
    {
      name: DATA_FOR.ACCT_MONTH,
      pattern: [true, false, false, true, false]
    },
    {
      name: DATA_FOR.ACCT_MONTH_YEAR,
      pattern: [true, false, false, true, true]
    },
    {
      name: DATA_FOR.ACCT_FIX,
      pattern: [true, false, true, false, false]
    },
    {
      name: DATA_FOR.ACCT_FIX_YEAR,
      pattern: [true, false, true, false, true]
    },
    {
      name: DATA_FOR.ACCT_FIX_MONTH,
      pattern: [true, false, true, true, false]
    },
    {
      name: DATA_FOR.ACCT_FIX_MONTH_YEAR,
      pattern: [true, false, true, true, true]
    },
    {
      name: DATA_FOR.ACCT_CODE,
      pattern: [true, true, false, false, false]
    },
    {
      name: DATA_FOR.ACCT_CODE_YEAR,
      pattern: [true, true, false, false, true]
    },
    {
      name: DATA_FOR.ACCT_CODE_MONTH,
      pattern: [true, true, false, true, false]
    },
    {
      name: DATA_FOR.ACCT_CODE_MONTH_YEAR,
      pattern: [true, true, false, true, true]
    },
    {
      name: DATA_FOR.ACCT_CODE_FIX,
      pattern: [true, true, true, false, false]
    },
    {
      name: DATA_FOR.ACCT_CODE_FIX_YEAR,
      pattern: [true, true, true, false, true]
    },
    {
      name: DATA_FOR.ACCT_CODE_FIX_MONTH,
      pattern: [true, true, true, true, false]
    },
    {
      name: DATA_FOR.ALL_FILTERS,
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

/**
 * @typedef {object} TaxReport
 * @property {string} name
 * @property {Subcategory[]} subcategories
 */

/**
 * @typedef {object} Subcategory
 * @property {TaxAmount[]} amount
 * @property {string} name
 */

/**
 * @typedef {object} TaxAmount
 * @property {number} label_id
 * @property {string} subtotal
 */

/**
 * Preps the data that is returned from `getTaxSubtotals`. Because the
 *   database query groups amounts by `label_id`, it may include
 *   duplicate values which we remove here. Once duplicates are removed,
 *   all the values are combined into one total.
 * @param {TaxReport[]} reports
 */
export const prepTaxSubtotalsResponse = (reports) => {
  return reports.map(report => {
    return {
      name: report.name,
      subcategories: report.subcategories.map(subcategory => {
        const taxAmount = {...subcategory};
        if (subcategory.amount.length < 1) {
          taxAmount.amount = 0;
        }
        if (subcategory.amount.length) {
          const amounts = subcategory.amount.map(x => Number(x.subtotal));
          const uniqueAmounts = [...new Set(amounts)];
          taxAmount.amount = uniqueAmounts.reduce((a, b) => a + b, 0);
        }
        return taxAmount;
      })
    }
  })
};
