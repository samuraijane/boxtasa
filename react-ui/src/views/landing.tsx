import { Search } from "../components/search";
import { Transactions } from "../components/transactions/transactions";

export const LandingPage = (): JSX.Element => {
  
  return (
    <div className="landing">
      <Search />
      <Transactions />
    </div>
  );
};
