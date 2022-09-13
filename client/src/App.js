import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth"
const AuthenticLandingPage  = Auth( LandingPage , null)
const AuthenticLoginPage  = Auth( LoginPage , false)
const AuthenticRegisterPage  = Auth( RegisterPage , false)

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element = {<AuthenticLandingPage />} />
          <Route path="/login" element = {<AuthenticLoginPage />} />
          <Route path="/register" element = {<AuthenticRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;