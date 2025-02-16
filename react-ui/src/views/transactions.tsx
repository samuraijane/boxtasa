import { Transactions } from "../components/transactions/transactions";
import { DataSelector } from "../components/data-selector/data-selector";
import { useSelector } from "react-redux";
import { selectTabs } from "../features/tabsSlice";
import { Tabs } from "../components/tabs/tabs";
import { ViewTabs } from "../types/enum";
import { Codes } from "../components/codes/codes";
import { Snapshot } from "../components/snapshot/snapshot";
import { Taxes } from "../components/taxes/taxes";
import { Vendors } from "../components/vendors/vendors";

export const TransactionsPage = (): JSX.Element => {
  const { activeTab } = useSelector(selectTabs);

  return (
    <>
      <DataSelector />
      <Tabs />
      {activeTab === ViewTabs.CODES && <Codes />}
      {activeTab === ViewTabs.SNAPSHOT && <Snapshot />}
      {activeTab === ViewTabs.TRANSACTIONS && <Transactions />}
      {activeTab === ViewTabs.TAXES && <Taxes />}
      {activeTab === ViewTabs.VENDORS && <Vendors />}
    </>
  );
};
