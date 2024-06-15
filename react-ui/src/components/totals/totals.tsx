import { useSelector } from "react-redux";
import { selectTotals } from "../../features/filteredDataSlice";
import "./totals.scss";

export const Totals = () => {
  const totals = useSelector(selectTotals);

  const _totals = totals?.map(total => (
    <div className="totals__total" key={total.year}>
      <span>{total.year}</span>
      <span className="totals__count">{total.count}</span>
      <span>${total.total}</span>
    </div>
  ));

  return (
    <>
      {_totals?.length && (
        <div className="totals">
          {_totals}
        </div>
      )}
    </>

  )
};
