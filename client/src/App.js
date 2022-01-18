import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="container">
      <div className="row justify-content-around">
        <div className="col-sm-6 text-center mb-3">
          <img
            width="200px"
            src="https://www.lftechnology.com/wp-content/themes/Froggy/img/logo_leapfrog.svg"
            alt="Company Logo"
          ></img>
        </div>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
