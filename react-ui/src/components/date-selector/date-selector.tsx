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
  const dates = (data as string[]).map((date, index) => (
    <li
      className={`date-selector__date${selected === date ? " date-selector__date--selected" : ""}`}
      data-id={date}
      data-type="date"
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
