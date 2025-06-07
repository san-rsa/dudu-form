import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Home from "./pages/Home";
import 'react-toastify/dist/ReactToastify.css';

import "./styles/style.css"

function Links() {
 
  return (
 
        <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />

    </Routes>       

  </BrowserRouter>    
 
  );
}



function App() {
 
  return (
 
    <div >
          <Links />


<ToastContainer />
    </div>

 
 
  );
}
export default App;