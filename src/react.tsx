import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import Root from './main.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Root />
    </BrowserRouter>
)
