import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountSelector } from "./subcomponents/account-selector/account-selector";
import { CodeSelector } from "./subcomponents/code-selector/code-selector";
import { YearSelector } from "./subcomponents/year-selector/year-selector";
import { AppDispatch } from "../../app/store";
import "./data-selector.scss";
import { selectSelector, setSelector } from "../../features/selectorSlice";

export const DataSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectors = useSelector(selectSelector);
  const { acctId, codeId, year } = selectors;

  const handleSelection = (e: MouseEvent<HTMLLIElement>) => {
    const { id, type } =( e.currentTarget as HTMLElement).dataset;

    if (!id) return; // TODO handle this error gracefully
    if (!type) return; // TODO handle this error gracefully

    const isAlreadyActive = selectors[type as keyof typeof selectors] === parseInt(id);

    dispatch(setSelector({
      ...selectors,
      [type]: isAlreadyActive ? 0 : parseInt(id)
    }));
  };

  return (
    <div className="data-selector">
      <div className="data-selector__selectors-container">
        <AccountSelector action={handleSelection} selected={acctId} />
        <CodeSelector action={handleSelection} selected={codeId} />
        <YearSelector action={handleSelection} selected={year} />
      </div>
    </div>
  );
};
