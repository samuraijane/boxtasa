import { SelectorProps } from "../date-selector/types";
import "./account-selector.scss";
import { useSelector } from "react-redux";
import { selectAccounts } from "../../features/accountsSlice";
import { Account } from "../../types/interface";

export const AccountSelector = ({ action, selected }: SelectorProps): JSX.Element => {
  const accounts = useSelector(selectAccounts);

  const accountNames = (accounts as Account[]).map((account) => {
    const {
      account_id,
      account_type_name,
      is_active,
      acct_no,
      short_name,
    } = account;

    return (
      <li
        className={`account-selector__account-container${selected === account_id ? " account-selector__account-container--selected" : ""}`}
        data-id={account_id}
        data-type="acctId"
        key={acct_no}
        onClick={action}
      >
        <div className="account-selector__account">
          <span>{acct_no}</span>
          <span>{short_name}</span>
          <span>{account_type_name}</span>
        </div>
      </li>
    )
  });

  return (
    <div className="account-selector">
      <ul className="account-selector__account-names">{accountNames}</ul>
    </div>
  );
};
