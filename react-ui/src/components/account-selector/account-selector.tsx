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
    <li>
      <p>{accountName.institutionName}</p>
      <ul className="account-selector__account-nos">
        {
          accountName.accounts.map((accountNumber) => {
            return (
              <li
                className={`account-selector__account-no${selected === accountNumber ? " account-selector__account-no--selected" : ""}`}
                key={accountNumber}
                data-id={accountNumber}
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
