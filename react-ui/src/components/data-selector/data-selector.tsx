import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountSelector } from "../account-selector/account-selector";
import { DateSelector } from "../date-selector/date-selector";
import { getTransactionData } from "../../features/activeDataSlice";
import { AppDispatch } from "../../app/store";
import "./data-selector.scss";

interface DataSelectorSelections {
  account: string;
  date: string; // TODO for now we only care about the year but we'll get more granular later
}

export const DataSelector = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selections, setSelections] = useState<DataSelectorSelections>({
    account: "",
    date: ""
  });

  const handleSelection = (e: MouseEvent<HTMLLIElement>) => {
    const { id, type } =( e.target as HTMLElement).dataset;

    if (id && type) {
      setSelections({
        ...selections,
        [type]: id
      });
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(getTransactionData({ acctName: selections.account, year: selections.date }));
  };

  return (
    <div className="data-selector">
      <AccountSelector action={handleSelection} selected={selections.account} />
      {selections.account && <DateSelector action={handleSelection} selected={selections.date} />}
      {selections.date && (
        <div className="btn-container">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};
