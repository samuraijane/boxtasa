import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountSelector } from "./subcomponents/account-selector/account-selector";
import { DateSelector } from "./subcomponents/date-selector/date-selector";
import { getTransactionData } from "../../features/activeDataSlice";
import { AppDispatch } from "../../app/store";
import "./data-selector.scss";

interface DataSelectorSelections {
  acctId: string;
  code: string;
  year: string; // TODO for now we only care about the year but we'll get more granular later
}

export const DataSelector = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selections, setSelections] = useState<DataSelectorSelections>({
    acctId: "",
    code: "",
    year: ""
  });;

  const handleSelection = (e: MouseEvent<HTMLLIElement>) => {
    const { id, type } =( e.currentTarget as HTMLElement).dataset;

    if (!id) return; // TODO handle this error gracefully
    if (!type) return; // TODO handle this error gracefully

    setSelections({
      ...selections,
      [type]: id
    });
  };

  const handleClick = () => {
    dispatch(getTransactionData({
      acctId: selections.acctId,
      code: selections.code,
      year: selections.year
    }));
  };

  return (
    <div className="data-selector">
      <div className="data-selector__selectors-container">
        <AccountSelector action={handleSelection} selected={parseInt(selections.acctId)} />
        <DateSelector action={handleSelection} selected={selections.year} />
      </div>
      <button onClick={handleClick}>Get Transactions</button>
    </div>
  );
};
