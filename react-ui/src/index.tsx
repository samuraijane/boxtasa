import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from "./app";
import { verifyAuth } from "./features/authSlice";
import { getCodes } from "./features/codesSlice";
import './styles/style.scss';

const container: HTMLElement | null = document.getElementById("root");
const root = container && createRoot(container);

store.dispatch(verifyAuth());
store.dispatch(getCodes());

root?.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
