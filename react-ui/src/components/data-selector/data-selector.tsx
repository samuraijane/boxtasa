import { MouseEvent, useState } from "react";
import { AccountSelector } from "../account-selector/account-selector";
import { DateSelector } from "../date-selector/date-selector";
import "./data-selector.scss";

interface DataSelectorSelections {
  account: string;
  date: string; // TODO for now we only care about the year but we'll get more granular later
}

export const DataSelector = () => {
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
    const url = `/api/transactions/?acctName=${selections.account}&year=${selections.date}`;
    const data = await fetch(url);
    const response = await data.json();

    // TODO handle errors, currently there is no `isErorr` key when there is an error
    const { isError } = response;

    if (isError) {
      console.error(response.error);
      return;
    }
    console.log(response)
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
