import { Route, Routes } from 'react-router-dom';
import { CodesPage } from './codes';
import { PrivateView } from './private/private';
import { LandingPage } from './landing';
import { LoginPage } from './login';
import { LogoutPage } from './logout';
import { TransactionsPage } from './transactions';
import { VendorsPage } from './vendors';

export const View = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/codes" element={<CodesPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/logout" element={<LogoutPage />} />
    <Route path="/transactions" element={<TransactionsPage />} />
    <Route path="/vendors" element={<VendorsPage />} />
  </Routes>
);
