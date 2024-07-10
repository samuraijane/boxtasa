const sqlWhereForNoFilters = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;
const sqlWhereForYear = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;
const sqlWhereForMonth = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;
const sqlWhereForMonthYear = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;
const sqlWhereForFix = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;
const sqlWhereForFixYear = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND _years.year_name = $5
`;
const sqlWhereForFixMonth = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;
const sqlWhereForFixMonthYear = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;
const sqlWhereForCode = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;
const sqlWhereForCodeYear = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;
const sqlWhereForCodeMonth = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;
const sqlWhereForCodeMonthYear = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;
const sqlWhereForCodeFix = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;
const sqlWhereForCodeFixYear = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND _years.year_name = $5
`;
const sqlWhereForCodeFixMonth = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;
const sqlWhereForCodeFixMonthYear = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;
const sqlWhereForAcct = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;
const sqlWhereForAcctYear = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;
const sqlWhereForAcctMonth = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;
const sqlWhereForAcctMonthYear = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;
const sqlWhereForAcctFix = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;
const sqlWhereForAcctFixYear = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND _years.year_name = $5
`;
const sqlWhereForAcctFixMonth = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;
const sqlWhereForAcctFixMonthYear = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;
const sqlWhereForAcctCode = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;
const sqlWhereForAcctCodeYear = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;
const sqlWhereForAcctCodeMonth = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;
const sqlWhereForAcctCodeMonthYear = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;
const sqlWhereForAcctCodeFix = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;
const sqlWhereForAcctCodeFixYear = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND _years.year_name = $5
`;
const sqlWhereForAcctCodeFixMonth = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;
const sqlWhereForAllFilters = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

const dict = {
  noFilters: sqlWhereForNoFilters,
  year: sqlWhereForYear,
  month: sqlWhereForMonth,
  monthYear: sqlWhereForMonthYear,
  fix: sqlWhereForFix,
  fixYear: sqlWhereForFixYear,
  fixMonth: sqlWhereForFixMonth,
  fixMonthYear: sqlWhereForFixMonthYear,
  code: sqlWhereForCode,
  codeYear: sqlWhereForCodeYear,
  codeMonth: sqlWhereForCodeMonth,
  codeMonthYear: sqlWhereForCodeMonthYear,
  codeFix: sqlWhereForCodeFix,
  codeFixYear: sqlWhereForCodeFixYear,
  codeFixMonth: sqlWhereForCodeFixMonth,
  codeFixMonthYear: sqlWhereForCodeFixMonthYear,
  acct: sqlWhereForAcct,
  acctYear: sqlWhereForAcctYear,
  acctMonth: sqlWhereForAcctMonth,
  acctMonthYear: sqlWhereForAcctMonthYear,
  acctFix: sqlWhereForAcctFix,
  acctFixYear: sqlWhereForAcctFixYear,
  acctFixMonth: sqlWhereForAcctFixMonth,
  acctFixMonthYear: sqlWhereForAcctFixMonthYear,
  acctCode: sqlWhereForAcctCode,
  acctCodeYear: sqlWhereForAcctCodeYear,
  acctCodeMonth: sqlWhereForAcctCodeMonth,
  acctCodeMonthYear: sqlWhereForAcctCodeMonthYear,
  acctCodeFix: sqlWhereForAcctCodeFix,
  acctCodeFixYear: sqlWhereForAcctCodeFixYear,
  acctCodeFixMonth: sqlWhereForAcctCodeFixMonth,
  allFilters: sqlWhereForAllFilters
};

export const getWhere = (whereQuery) => dict[whereQuery];
