import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Router';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'context/CustomerContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);