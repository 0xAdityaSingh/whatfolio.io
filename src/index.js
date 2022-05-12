import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { MoralisProvider } from "react-moralis";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://ds9uru684cto.usemoralis.com:2053/server" appId="KhjIDDqyXJDn3btJ0XQ11Cs99AdVhxMnBhQUQ3W9">
    <App />
    </MoralisProvider>
  </React.StrictMode>
);
