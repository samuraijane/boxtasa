
import { SelectorProps } from "../../../../types/interface";
import "./fix-selector.scss";

export const FixSelector = ({ action, selected }: SelectorProps): JSX.Element => (
  <div className="fix-selector">
    <ul className="fix-selector__fixes">
      <li
        className={`selector-container${selected === 975 ? " selector-container--selected" : ""}`}
        data-id={975}
        data-type="fixId"
        onClick={action}
      >
        Fix
      </li>
    </ul>
  </div>
);

/*
NOTE

We hardcode `1` as this corresponds to vendors name that are undefined.
In the future, it is likely this will become more dynamic and take into
account other areas.
*/
