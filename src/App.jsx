import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BackgroundEffect from "./BackgroundEffect";
import Home from "./components/Home";
import Ask from "./pages/Ask";
import Answer from "./pages/Answer";
import Dashboard from "./pages/Dashboard";
import { Toaster } from 'react-hot-toast';
import { useWeb3 } from "./context/context";



function App() {

  

useEffect(()=>{
  console.log(10000);
},[]);

  return (
    <div className="App">
      <Toaster/>
      <BackgroundEffect />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
