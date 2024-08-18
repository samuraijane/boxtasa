import "./taxes.scss";
import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelector } from "../../features/selectorSlice";
import { AppDispatch } from "../../app/store";
import { getTaxSubtotals } from "../../features/taxesSlice";
import { selectTaxes } from "../../features/taxesSlice";
import { createId } from "../../utils";

export const Taxes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectors = useSelector(selectSelector);
  const taxes = useSelector(selectTaxes);
  const { year } = selectors;

  useEffect(() => {
    if (year) {
      dispatch(getTaxSubtotals(year));
    }
  }, [year]);

  return (
    <div className="taxes">
      {!year && <>Select a year to see the tax report for that year.</>}
      {year > 0 && <h1>Tax Report for {year}</h1>}
      <div className="taxes__reports">
        {year > 0 && taxes.length && taxes.map(tax => (
          <div className="taxes__report" key={createId(12)}>
            <h2>{tax.name}</h2>
            <ul className="taxes__line-items">
              {tax.subcategories.map(subcategory => (
                <li key={createId(10)}>
                  <span>{subcategory.name}</span>
                  <span>{subcategory.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
