import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountSelector } from "./subcomponents/account-selector/account-selector";
import { CodeSelector } from "./subcomponents/code-selector/code-selector";
import { DateSelector } from "./subcomponents/date-selector/date-selector";
import { getTransactionData } from "../../features/activeDataSlice";
import { AppDispatch } from "../../app/store";
import "./data-selector.scss";

interface DataSelectorSelections {
  acctId: string;
  codeId: string;
  year: string; // TODO for now we only care about the year but we'll get more granular later
}

export const DataSelector = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selections, setSelections] = useState<DataSelectorSelections>({
    acctId: "",
    codeId: "",
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
      codeId: selections.codeId,
      year: selections.year
    }));
  };

  return (
    <div className="data-selector">
      <div className="data-selector__selectors-container">
        <AccountSelector action={handleSelection} selected={selections.acctId} />
        <CodeSelector action={handleSelection} selected={selections.codeId} />
        <DateSelector action={handleSelection} selected={selections.year} />
      </div>
      <div className="btn-container">
        <button onClick={handleClick}>Get Transactions</button>
      </div>
    </div>
  );
};
