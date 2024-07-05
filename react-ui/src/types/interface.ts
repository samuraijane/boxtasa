export interface Code {
  code_id: number;
  code_name: string;
  code_description: string;
}

export interface Vendor {
  count: number;
  vendor_id: number;
  vendor_name: string;
}

export interface Transaction {
  account_type_name: string,
  acct_no: string,
  amount: string;
  code_name: string;
  date_day: number,
  date_month: number,
  date_year: number,
  short_name: string,
  transaction_id: number,
  transaction_memo: string;
  transaction_type_name: string;
  vendor_name: string;
  note: string;
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
  activeTransaction: Transaction;
  auth: boolean;
  code: Code[];
  filteredData: FilteredData;
  isModal: boolean;
  vendor: Vendor[]
}

export interface Total {
  count: number;
  total: number;
  year: number;
}

export interface PatchTransaction {
  id: number;
  note: string;
}

export interface PostTransaction {
  codeId?: string;
  transactionId: string;
  vendorId?: string;
}

export interface BulkData {
  codeId?: string;
  transactions: Transaction[],
  vendorId?: string;
}
