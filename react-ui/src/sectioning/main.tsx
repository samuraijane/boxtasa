import { useEffect, useState } from "react";

interface Transaction {
  acct_no: string;
  short_name: string;
  account_type_name: string;
  date_year: number;
  date_month: number;
  date_day: number;
  transaction_id: string;
  transaction_memo: string;
  transaction_type_name: string;
  amount: string;
}

const Main = (): JSX.Element => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/transactions");
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const _transactions = transactions.map((x, y) => {
    const {
      acct_no: acctNo,
      short_name: acctName,
      account_type_name: acctType,
      date_year: year,
      date_month: month,
      date_day: day,
      transaction_id: id,
      transaction_memo: memo,
      transaction_type_name: transactionType,
      amount
    } = x;
    return (
      <li key={id}>  
        <span>{acctNo}</span>
        <span>{acctName}</span>
        <span>{acctType}</span>
        <span>{year}</span>
        <span>{month}</span>
        <span>{day}</span>
        <span>{memo}</span>
        <span>{transactionType}</span>
        <span>{amount}</span>
      </li>
    );
  });

  return (
    <main className="y-wrap">
      <ul className="transactions">{_transactions}</ul>
    </main>
  );
};

export default Main;
