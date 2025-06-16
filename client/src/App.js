import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./App.css";
import IdCardPage from "./pages/IdCardPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./auth/RequireAuth";
import axios from "axios";

function App() {
  const [generatedCard, setGeneratedCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);


  const handleLogout= async() => {
    try {
      await axios.get('http://localhost:5000/logout');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('error in logout: ', error)
      setIsLoggedIn(true);
    }
  }
  return (
    <div className="App">
      <header style={{ textAlign: "center" ,display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>ID Card Generator</h1> 
        {isLoggedIn && <span onClick={handleLogout} style={{backgroundColor:'red', padding: '5px 20px', color:'white', cursor: 'pointer'}}>Logout</span>}
      </header>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <IdCardPage
                  generatedCard={generatedCard}
                  setGeneratedCard={setGeneratedCard}
                />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
