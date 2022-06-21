import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';



ReactDOM.render(
    <React.StrictMode>
        <MoralisProvider appId="xxx" serverUrl="xxx">
            <NotificationProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </NotificationProvider>
        </MoralisProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

