export interface Code {
  code_id: number;
  code_name: string;
  code_description: string;
  created_at?: string;
  updated_at?: string;
}

export interface Vendor {
  vendor_id: number;
  vendor_name: string;
}

export interface Transaction {
  transaction_id: number,
  account_type_name: string,
  short_name: string,
  acct_no: string,
  date_day: number,
  date_month: number,
  date_year: number,
  amount: string;
  transaction_type_name: string;
  transaction_memo: string;
  code_name: string;
}

// Redux store
interface ActiveData {
  account: string;
  transactions: Transaction[]
}

interface FilteredData {
  filteredTransactions: Transaction[];
  searchTerm: string;
  totals: Total[]
}

export interface Account {
  account_id: number;
  account_type_name: string;
  is_active: boolean;
  acct_no: string;
  short_name: string;
}

export interface ReduxStore {
  account: Account[];
  activeData: ActiveData;
  auth: boolean;
  code: Code[];
  filteredData: FilteredData;
  vendor: Vendor[]
}

export interface Total {
  count: number;
  total: number;
  year: number;
}
