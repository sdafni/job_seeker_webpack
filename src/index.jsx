import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter, Route, Routes } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById("root")).render(



  
     <HashRouter>
            <Routes>

        <Route path="/" element={<App />}/>
        <Route path="/content_script" element={<App content_view={true}/>}/>
        </Routes>

      </HashRouter>
    


) 