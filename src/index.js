import React from 'react';
import ReactDom from 'react-dom';
import App from './App.js';
import './index.css';

const root = ReactDom.createRoot(document.getElementById("root"))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
                     