import { MouseEvent, useState } from "react";
import data from "./account-selector.json";
import "./account-selector.scss"

interface AccountSelectorProps {
  accounts: string[];
  institutionName: string;
  institutionShortName: string;
}

export const AccountSelector = (): JSX.Element => {
  const [selected, setSelected] = useState("");

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = (e.target as HTMLElement).dataset;
    setSelected(id!);
  };

  const accountNames = (data as AccountSelectorProps[]).map((accountName, index) => (
    <li>
      <p>{accountName.institutionName}</p>
      <ul className="account-selector__account-nos">
        {
          accountName.accounts.map((accountNumber) => {
            return (
              <li
                className={`account-selector__account-no account-selector__account-no--${selected === accountNumber ? "selected" : ""}`}
                key={accountNumber}
                data-id={accountNumber}
                onClick={handleClick}
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
