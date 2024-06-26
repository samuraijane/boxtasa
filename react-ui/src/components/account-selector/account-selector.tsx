import { SelectorProps } from "../date-selector/types";
import data from "./account-selector.json";
import "./account-selector.scss"

interface Accounts {
  acctId: string;
  acctNo: string;
}
interface AccountSelectorNames {
  accounts: Accounts[];
  institutionName: string;
  institutionShortName: string;
}

export const AccountSelector = ({ action, selected }: SelectorProps): JSX.Element => {

  // TODO replace hardcoded account data with queries to the database
  const accountNames = (data as AccountSelectorNames[]).map((datum, index) => (
    <li key={datum.institutionShortName}>
      <p>{datum.institutionName}</p>
      <ul className="account-selector__account-nos">
        {
          datum.accounts.map((account) => {
            const _id = account.acctId;
            return (
              <li
                className={`account-selector__account-no${selected === _id ? " account-selector__account-no--selected" : ""}`}
                key={_id}
                data-id={_id}
                data-type="acctId"
                onClick={action}
              >
                {account.acctNo}
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
