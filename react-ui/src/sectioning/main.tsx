import { Route, Routes } from 'react-router-dom';
import Home from "../routes/landing";
import Search from "../routes/search";
import Transactions from "../routes/transactions";

const Main = (): JSX.Element => {
  return (
    <main className="y-wrap">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="transactions" element={<Transactions />} />
      </Routes>
    </main>
  )
};

export default Main;