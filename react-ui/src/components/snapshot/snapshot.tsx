import { useSelector } from "react-redux";
import { selectFilteredTransactions } from "../../features/filteredDataSlice";
import { SnapshotAccounts } from "./subcomponents/accounts";
import { SnapshotDebts } from "./subcomponents/debts";
import "./snapshot.scss";

export const Snapshot = () => {
  const matchingTransactions = useSelector(selectFilteredTransactions);

  return (
    <div className="snapshot">
      <SnapshotAccounts transactions={matchingTransactions} />
      <SnapshotDebts transactions={matchingTransactions.filter(x => x.code_name === "DE")} />
    </div>
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
