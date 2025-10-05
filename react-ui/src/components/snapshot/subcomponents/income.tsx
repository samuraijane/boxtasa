import { createId, prepSimpleLabeling } from "../../../utils";
import { Transaction } from "../../../types/interface";

export const SnapshotIncome = ({ title, transactions }: {title: string; transactions: Transaction[]}) => {
  const filterBy = title === "W2" ? "W2" : "C Gross Receipts";
  const renderDataFor = (data: Transaction[]) => {
    const polishedData = prepSimpleLabeling(data, filterBy);
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
