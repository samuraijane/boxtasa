import { createId, prepComplexLabeling } from "../../../utils";
import { Transaction } from "../../../types/interface";

export const SnapshotDebts = ({ transactions }: {transactions: Transaction[]}) => {
  /**
   * Renders account data that is sorted by account type and then
   *   further sorted by account number.
   * @param data 
   * @returns 
   */
  const renderDataFor = (data: Transaction[]) => {
    const polishedData = prepComplexLabeling(data);
    const items = polishedData.map((item) => (
      <li className="snapshot__accounts-inner" key={createId(12)}>
        <h3>{item.primaryLabel}</h3>
        <ul>{item.vendors.map((vendor) => (
            <li key={createId(10)}>
              {vendor}
            </li>
          ))}
        </ul>
      </li>
    ));

    return items;
  };

  return (
    <div className="snapshot__accounts-container">
      <h2>Debt</h2>
      <ul className="snapshot__accounts-outer">
        {renderDataFor(transactions)}
      </ul>
    </div>
  );
};
