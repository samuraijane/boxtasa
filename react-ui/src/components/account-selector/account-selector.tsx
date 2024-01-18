import { SelectorProps } from "../date-selector/types";
import data from "./account-selector.json";
import "./account-selector.scss"

interface AccountSelectorNames {
  accounts: string[];
  institutionName: string;
  institutionShortName: string;
}

export const AccountSelector = ({ action, selected }: SelectorProps): JSX.Element => {

  const accountNames = (data as AccountSelectorNames[]).map((accountName, index) => (
    <li key={accountName.institutionShortName}>
      <p>{accountName.institutionName}</p>
      <ul className="account-selector__account-nos">
        {
          accountName.accounts.map((accountNumber) => {
            const _id = `${accountName.institutionShortName}${accountNumber}`;
            return (
              <li
                className={`account-selector__account-no${selected === _id ? " account-selector__account-no--selected" : ""}`}
                key={_id}
                data-id={_id}
                data-type="account"
                onClick={action}
              >
                {accountNumber}
              </li>
            );
          })
        }
      </ul>
    </li>
  ));

  return (
    <div className="account-selector">
      <ul className="account-selector__account-names">{accountNames}</ul>
    </div>
  );
};
