// do not filter (e.g. return all transactions in the database)
const sqlGetTransactionsA = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// acctId
const sqlGetTransactionsB = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// acctId, codeId
const sqlGetTransactionsC = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// acctId, codeId, fixId
const sqlGetTransactionsD = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// acctId, codeId, fixId, month
const sqlGetTransactionsE = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;

// code
const sqlGetTransactionsF = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// code, fixId
const sqlGetTransactionsG = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// code, fixId, month
const sqlGetTransactionsH = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;

// code, fixId, month, year
const sqlGetTransactionsI = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// fixId
const sqlGetTransactionsJ = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// fixId, month
const sqlGetTransactionsK = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;

// fixId, month, year
const sqlGetTransactionsL = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// acctId, fixId, month, year
const sqlGetTransactionsM = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// month
const sqlGetTransactionsN = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;

// month, year
const sqlGetTransactionsO = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// acctId, month, year
const sqlGetTransactionsP = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// acctId, codeId, month, year
const sqlGetTransactionsQ = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// year
const sqlGetTransactionsR = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;

// acctId, year
const sqlGetTransactionsS = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;

// acctId, codeId, year
const sqlGetTransactionsT = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;

// acctId, codeId, fixId, year
const sqlGetTransactionsU = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND _years.year_name = $5
`;

// acctId, codeId, fixId, month, year
const sqlGetTransactionsV = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

const dict = {
  A: sqlGetTransactionsA,
  B: sqlGetTransactionsB,
  C: sqlGetTransactionsC,
  D: sqlGetTransactionsD,
  E: sqlGetTransactionsE,
  F: sqlGetTransactionsF,
  G: sqlGetTransactionsG,
  H: sqlGetTransactionsH,
  I: sqlGetTransactionsI,
  J: sqlGetTransactionsJ,
  K: sqlGetTransactionsK,
  L: sqlGetTransactionsL,
  M: sqlGetTransactionsM,
  N: sqlGetTransactionsN,
  O: sqlGetTransactionsO,
  P: sqlGetTransactionsP,
  Q: sqlGetTransactionsQ,
  R: sqlGetTransactionsR,
  S: sqlGetTransactionsS,
  T: sqlGetTransactionsT,
  U: sqlGetTransactionsU,
  V: sqlGetTransactionsV
};

export const getWhere = (whereQuery) => dict[whereQuery];
