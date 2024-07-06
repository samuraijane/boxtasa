import { SelectorProps } from "../date-selector/types";
import "./account-selector.scss";
import { useSelector } from "react-redux";
import { selectAccounts } from "../../../../features/accountsSlice";
import { Account } from "../../../../types/interface";
import { sortByAccountNumber } from "../../../../utils";

export const AccountSelector = ({ action, selected }: SelectorProps): JSX.Element => {
  const accounts = useSelector(selectAccounts);

  let activeAccounts: Account[] = [];
  let inactiveAccounts: Account[] = [];

  accounts.forEach(x => {
    if (x.is_active) {
      activeAccounts.push(x);
    } else {
      inactiveAccounts.push(x);
    }
  });

  const renderAccount = (account: Account) => {
    const {
      account_id,
      account_type_name,
      acct_no,
      short_name,
    } = account;

    return (
      <li
        className={`selector-container${selected === account_id ? " selector-container--selected" : ""}`}
        data-id={account_id}
        data-type="acctId"
        key={acct_no}
        onClick={action}
      >
        <div className="acct-s__account" title={`${short_name} (${account_type_name})`}>
          <span>{acct_no}</span>
        </div>
      </li>
    )
  };

  const _activeAccounts = sortByAccountNumber(activeAccounts).map(y => renderAccount(y));
  const _inactiveAccounts = sortByAccountNumber(inactiveAccounts).map(z => renderAccount(z));


  return (
    <div className="acct-s">
      <ul className="acct-s__accounts acct-s__accounts--inactive">{_inactiveAccounts}</ul>
      <ul className="acct-s__accounts acct-s__accounts--active">{_activeAccounts}</ul>
    </div>
  );
};
