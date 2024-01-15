import { MouseEvent, useEffect, useState } from "react";
import { Modal } from "../modal/modal";
import "./transactions.scss";

export interface Transaction {
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
  code_name: string;
}

export const Transactions = (): JSX.Element => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalActive, setIsModalActive] =useState(false);
  const [activeTransaction, setActiveTransaction] = useState<any>();

  const getData = async () => {
    const response = await fetch("http://localhost:8080/transactions");
    const data = await response.json();
    setTransactions(data);
  };

  const postData = async (transactionId: string, codeName="AHEL") => {
    const response = await fetch("http://localhost:8080/transactions", {
      body: JSON.stringify({ codeName, transactionId }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    });
    
    return await response.json();
  };

  useEffect(() => {
    if (!transactions.length) {
      getData();
    }
  }, [transactions]);

  const handleClick = async (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setIsModalActive(!isModalActive);
    const { id } = (e.currentTarget as HTMLLIElement).dataset;
    setActiveTransaction(transactions.find(x => {
      console.log(typeof x.transaction_id, typeof id);
      return x.transaction_id == id
    }));

    // // TODO handle error more gracefully
    // if (!id) {
    //  console.error('ID is missing, bruv');
    //  return; 
    // }
    // const response = await postData(id);
    // const updatedTransactions = transactions.map(z => {
    //   const { transaction_id } = z;

    //   // not strict because `transaction_id` is a number while `id` is a string
    //   if (transaction_id != id) {
    //     return z;
    //   }
    //   return response.updated;
    // });
    // setTransactions(updatedTransactions);
  };

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
      amount,
      code_name: codeName
    } = x;
    return (
      <li data-id={id} key={id} onClick={handleClick}>  
        <span>{acctNo}</span>
        <span>{acctName}</span>
        <span>{acctType}</span>
        <span>{year}</span>
        <span>{month}</span>
        <span>{day}</span>
        <span>{memo}</span>
        <span>{transactionType}</span>
        <span>{amount}</span>
        <span>{codeName}</span>
      </li>
    );
  });

  return (
    <main className="y-wrap">
      <ul className="transactions">{_transactions}</ul>
      {isModalActive && activeTransaction && <Modal action={handleClick} data={activeTransaction}/>}
    </main>
  );
};
