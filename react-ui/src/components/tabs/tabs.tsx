import { MouseEvent } from "react";
import "./tabs.scss";
import { DbTabs, ViewTabs } from "../../types/enum";
import { useDispatch, useSelector } from "react-redux";
import { selectTabs, setTab } from "../../features/tabsSlice";
import { AppDispatch } from "../../app/store";
import { TabButton } from "./subcomponents/tab-button";
import { selectSelector } from "../../features/selectorSlice";
import { getTransactionData } from "../../features/activeDataSlice";

export const Tabs = () => {
  const { activeTab } = useSelector(selectTabs);
  const dispatch = useDispatch<AppDispatch>();
  const selectors = useSelector(selectSelector);

  const viewTabs = [
    ViewTabs.CODES,
    ViewTabs.SNAPSHOT,
    ViewTabs.TRANSACTIONS,
    ViewTabs.TAXES,
    ViewTabs.VENDORS
  ].map(tab => <TabButton isActive={activeTab === tab} key={tab} text={tab} />);

  const dbTabs = [
    DbTabs.ADD,
    DbTabs.LOAD
  ].map(tab => <TabButton key={tab} text={tab} />);

  const handleClick = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLDivElement || e.target instanceof HTMLButtonElement)) {
      return;
    }
    const { type } = e.target.dataset;
    if (!type) {
      console.warn("The type for the button you have clicked is unknown.");
      return;
    }
    if (type === DbTabs.LOAD) {
      dispatch(getTransactionData({
        acctId: selectors.acctId,
        codeId: selectors.codeId,
        fixId: selectors.fixId,
        month: selectors.month,
        year: selectors.year
      }));
      return;
    }
    if (type === DbTabs.ADD) {
      console.warn("The functionality for this button has not yet been configured.");
      return;
    }
    dispatch(setTab(type as ViewTabs));
  };

  return (
    <div className="tabs" onClick={handleClick}>
      <div className="tabs__group">{viewTabs}</div>
      <div className="tabs__group">{dbTabs}</div>
    </div>
  );
};
