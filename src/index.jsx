import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <HashRouter>
        <Route path="/" element={<App />}/>
        <Route path="/content_script" element={<App content_view={true}/>}/>
      </HashRouter>
    
  </React.StrictMode>
) 