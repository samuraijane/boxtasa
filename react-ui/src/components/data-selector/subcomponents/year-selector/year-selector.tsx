
import { SelectorProps } from "../../../../types/interface";
import { useSelector } from "react-redux";
import { selectYears } from "../../../../features/yearsSlice";
import "./year-selector.scss"

export const YearSelector = ({ action, selected }: SelectorProps): JSX.Element => {
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
    <div className="year-selector">
      <ul className="year-selector__years">{_years}</ul>
    </div>
  );
};
