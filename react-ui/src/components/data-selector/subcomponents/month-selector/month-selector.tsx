
import { SelectorProps } from "../../../../types/interface";
import { useSelector } from "react-redux";
import { selectMonths } from "../../../../features/monthsSlice";
import "./month-selector.scss";

export const MonthSelector = ({ action, selected }: SelectorProps): JSX.Element => {
  const months = useSelector(selectMonths);

  const _months = months.map(_month => {
    const { abbr, id, number } = _month;

    return (
      <li
        className={`selector-container${selected === number ? " selector-container--selected" : ""}`}
        data-id={number}
        data-type="month"
        key={id}
        onClick={action}
      >
        {abbr}
      </li>
    );
  });

  return (
    <div className="month-selector">
      <ul className="month-selector__months">{_months}</ul>
    </div>
  );
};
