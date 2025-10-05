import { createId, prepSimpleLabeling } from "../../../utils";
import { Transaction } from "../../../types/interface";

export const SnapshotIncome = ({ title, transactions }: {title: string; transactions: Transaction[]}) => {
  const filterBy = title === "W2" ? "W2" : "C Gross Receipts";
  const renderDataFor = (data: Transaction[]) => {
    const _data = data.filter((x) => x.labels.find((y) => y.name === filterBy)) // L1
    const polishedData = prepSimpleLabeling(_data, filterBy);
    const items = polishedData.map((item) => (
      <li className="snapshot__accounts-inner" key={createId(12)}>
        <ul>{item.tenants.map((tenant) => (
            <li key={createId(10)}>
              {tenant}
            </li>
          ))}
        </ul>
      </li>
    ));

    return items;
  };

  return (
    <div className="snapshot__accounts-container">
      <h2>Income - {title}</h2>
      <ul className="snapshot__accounts-outer">
        {renderDataFor(transactions)}
      </ul>
    </div>
  );
};

/*

NOTES

[L1]
W2 transactions are already filtered so we don't do anything with them
here but if we are looking at 1099 income, we have to find only those
transactions with the label "C Gross Receipts". This code is obviously
fragile but we are leaving it for now.

*/
