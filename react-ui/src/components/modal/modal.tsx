import { Transaction } from "../transactions/transactions";
import "./modal.scss";

import { TransactionDetail } from "./subcomponents/transaction-detail";
import { UpdateByCode } from "./subcomponents/update-by-code";

interface ModalProps {
  data: Transaction;
  handleUpdate: Function;  // NOTE not 100% sure this is the right type but TS does not complain
}

export const Modal = ({ data, handleUpdate }: ModalProps): JSX.Element => {

  return (
    <div className="modal"> 
      <TransactionDetail {...data} />
      <UpdateByCode handleUpdate={handleUpdate} transactionId={data.transaction_id} />
    </div>
  );
}
