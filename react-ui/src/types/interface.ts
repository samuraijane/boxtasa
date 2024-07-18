import { MouseEventHandler } from "react"
import { ViewTabs } from "./enum";

export interface SelectorProps {
  action: MouseEventHandler<HTMLLIElement>,
  selected: number
}

export interface Code {
  count: number;
  code_id: number;
  code_name: string;
  code_description: string;
  total: number;
}

export interface Vendor {
  count: number;
  total: number;
  vendor_id: number;
  vendor_name: string;
}

export interface Transaction {
  account_type_name: string;
  acct_no: string;
  amount: string;
  code_name: string;
  date_day: number;
  date_month: number;
  labels: string[];
  note: string;
  short_name: string;
  transaction_id: number;
  transaction_memo: string;
  transaction_type_name: string;
  vendor_name: string;
  year_name: number;
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

export interface Year {
  year_id: number;
  year_name: number;
}

export interface Month {
  abbr: string;
  id: string;
  name: string;
  number: number;
}

export interface Label {
  id: number;
  name: string;
}

export interface TabState {
  activeTab: ViewTabs;
}

export interface ReduxStore {
  account: Account[];
  activeData: ActiveData;
  activeTransaction: Transaction;
  auth: boolean;
  code: Code[];
  filteredData: FilteredData;
  fixes: number; // this is plural even though for now, it's only for a number; in the future, it's likely it will be array of numbers
  isModal: boolean;
  labels: Label[];
  months: Month[];
  selector: SelectorState;
  tabs: TabState;
  vendor: Vendor[];
  years: Year[];
}

export interface SelectorState {
  acctId: number;
  codeId: number;
  fixId: number;
  month: number;
  year: number;
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
  labelIds?: string[];
  transactionId: string;
  vendorId?: string;
}

export interface BulkData {
  codeId?: string;
  labelIds?: string[];
  transactions: Transaction[],
  vendorId?: string;
}
