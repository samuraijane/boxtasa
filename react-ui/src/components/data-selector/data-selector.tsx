import { MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountSelector } from "../account-selector/account-selector";
import { DateSelector } from "../date-selector/date-selector";
import { getTransactionData } from "../../features/activeDataSlice";
import { AppDispatch } from "../../app/store";
import "./data-selector.scss";

interface DataSelectorSelections {
  acctId: string;
  year: string; // TODO for now we only care about the year but we'll get more granular later
}

export const DataSelector = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selections, setSelections] = useState<DataSelectorSelections>({
    acctId: "",
    year: ""
  });

  useEffect(() => {
    const { acctId, year } = selections;

    if (acctId && year) {
      dispatch(getTransactionData({ acctId: selections.acctId, year: selections.year }));
    }
  }, [selections]);

  const handleSelection = (e: MouseEvent<HTMLLIElement>) => {
    const { id, type } =( e.target as HTMLElement).dataset;

    if (id && type) {
      setSelections({
        ...selections,
        [type]: id
      });
    }
  };

  return (
    <div className="data-selector">
      <AccountSelector action={handleSelection} selected={selections.acctId} />
      <DateSelector action={handleSelection} selected={selections.year} />
    </div>
  );
};
