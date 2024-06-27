import { SelectorProps } from "./types";
import data from "./date-selector.json";
import "./date-selector.scss"

interface DateSelectorProps {
  accounts: string[];
  institutionName: string;
  institutionShortName: string;
}

export const DateSelector = ({ action, selected }: SelectorProps): JSX.Element => {

  // TODO at some point far in the future, implement a really nice way to select dates
  // TODO get years that are available from the database rather than a hardcoded JSON file
  const dates = data.map((date, index) => (
    <li
      className={`selector-container${selected === date ? " selector-container--selected" : ""}`}
      data-id={date}
      data-type="year"
      key={date}
      onClick={action}
    >
      {date}
    </li>
  ));

  return (
    <div className="date-selector">
      <ul className="date-selector__dates">{dates}</ul>
    </div>
  );
};
