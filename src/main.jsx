import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider} from "react-router-dom";
import { router } from './routes';
import WebApp from './WebApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <WebApp></WebApp>
  </React.StrictMode>,
)
