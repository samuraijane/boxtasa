import { SelectorProps } from "./types";
import { useSelector } from "react-redux";
import { selectYears } from "../../../../features/yearsSlice";
import "./date-selector.scss"

export const DateSelector = ({ action, selected }: SelectorProps): JSX.Element => {
  const years = useSelector(selectYears);

  // TODO at some point far in the future, implement a really nice way to select dates
  const _years = years.map((_year, index) => {
    const { year_id: id, year_name: year } = _year;

    return (
      <li
        className={`selector-container${selected === year ? " selector-container--selected" : ""}`}
        data-id={year}
        data-type="year"
        key={`${id}-${year}`}
        onClick={action}
      >
        {year}
      </li>
    );
  });

  return (
    <div className="date-selector">
      <ul className="date-selector__dates">{_years}</ul>
    </div>
  );
};
