import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Home from "./components/home";


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={isLoggedIn == "true" ? <Home /> : <Signin />}
              />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/oauth" element={<Home />} />
            </Routes>

    </Router>
  );
}

export default App;
