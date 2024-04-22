import { Search } from "../components/search";
import { Transactions } from "../components/transactions/transactions";
import { Codes } from "../components/codes/codes";

export const LandingPage = (): JSX.Element => {
  
  return (
    <div className="landing">
      <Search />
      <Codes />
      <Transactions />
    </div>
  );
};
