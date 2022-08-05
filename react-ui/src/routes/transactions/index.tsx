import TransactionData from '../../components/transactions/transactions';

const Transactions = (): JSX.Element => {
  return (
    <div className="y-wrap">
      <h1>Transactions</h1>
      <TransactionData />
    </div>
  )
};

export default Transactions;