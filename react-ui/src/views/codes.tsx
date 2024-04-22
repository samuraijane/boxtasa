import { Transactions } from "../components/transactions/transactions";
import { Codes } from "../components/codes/codes";

export const CodesPage = (): JSX.Element => {
  
  return (
    <div className="codes">
      <Codes />
      <Transactions />
    </div>
  );
};
