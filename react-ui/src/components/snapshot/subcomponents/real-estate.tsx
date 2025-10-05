import { createId, prepSimpleLabeling } from "../../../utils";
import { Transaction } from "../../../types/interface";

export const SnapshotRealEstate = ({ transactions }: {transactions: Transaction[]}) => {
  /**
   * Renders account data that is sorted by account type and then
   *   further sorted by account number.
   * @param data 
   * @returns 
   */
  const renderDataFor = (data: Transaction[]) => {
    const polishedData = prepSimpleLabeling(data, "E Rents Received");
    const items = polishedData.map((item) => (
      <li className="snapshot__accounts-inner" key={createId(12)}>
        <h3>{item.property}</h3>
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
      <h2>Real Estate</h2>
      <ul className="snapshot__accounts-outer">
        {renderDataFor(transactions)}
      </ul>
    </div>
  );
};
