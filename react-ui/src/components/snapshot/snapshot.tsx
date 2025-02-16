import { useSelector } from "react-redux";
import {
  selectFilteredTransactions
} from "../../features/filteredDataSlice";
import { sortByKeys } from "../../utils";
import { GenericObjectStr, Transaction } from "../../types/interface";
import "./snapshot.scss";

export const Snapshot = () => {
  const matchingTransactions = useSelector(selectFilteredTransactions);

  /**
   * Renders account data that is sorted by account type and then
   *   further sorted by account number.
   * @param data 
   * @returns 
   */
  const renderDataFor = (data: Transaction[]) => {
    let subitems: JSX.Element[] = [];
    let items: JSX.Element[] = [];
    let type = "";

    const accountData = [...new Map(data.map(item => [item.acct_no, item])).values()] as unknown as GenericObjectStr[]; // L1
    const sorted = sortByKeys(accountData, ["account_type_name", "acct_no"]) as Transaction[];

    sorted.forEach((account) => {
      const {
        acct_no: acctNo,
        account_type_name: acctType,
        short_name: acctName
      } = account;

      if (type !== acctType) {
        type = acctType;
        subitems = [];
      }

      if (!subitems.length) {
        items.push(
          <li className="snapshot__accounts" key={type}>
            <h2>{type}</h2>
            <ul>{subitems}</ul>
          </li>
        )
      }

      if (type === acctType) {
        subitems.push(
          <li key={acctNo}>
            <span>{acctNo}</span>
            <span>{acctName}</span>
          </li>
        );
      }
    });

    return items;
  };



  return (
    <ul className="snapshot">
      {renderDataFor(matchingTransactions)}
    </ul>
  )
};

/*
NOTES

[1]
Here we cache an array of unique objects based on the value of the key
`acct_no`. In other words, what we are really after are the unique
account numbers in the data set. Although we do not need all of the
key/values pairs in the object, we cache all of them so that we have
access to the ones we do need. The source for this code comes from a
thread on Stack Overflow noted by the URL below. While there are many
good answers here, we opted for the one by Arun Saini.
https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript

*/
