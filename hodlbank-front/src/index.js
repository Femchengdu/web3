import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<React.StrictMode>
    <MoralisProvider appId="xxx" serverUrl="xxx">
        <NotificationProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </NotificationProvider>
    </MoralisProvider>
</React.StrictMode>)
// ReactDOM.render(
//     <React.StrictMode>
//         <MoralisProvider appId="xxx" serverUrl="xxx">
//             <NotificationProvider>
//                 <BrowserRouter>
//                     <App />
//                 </BrowserRouter>
//             </NotificationProvider>
//         </MoralisProvider>
//     </React.StrictMode>,
//     document.getElementById('root')
// );

