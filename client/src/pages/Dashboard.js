import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("This also should be logged");
      const user = jwt_decode(token);
      console.log(user);
      if (!user) {
        console.log("not valid user");
        localStorage.removeItem("token");
        navigate.replace("/login");
      } else {
        console.log("Login with jwt is okay");
      }
    } else {
      console.log("not authenticated!");
      window.location.href = "/login";
    }
  });
  return (
    <React.Fragment>
      <div className="row justify-content-around">
        <div className="col-sm-6 text-center">
          <h6>Your Contact Manager!</h6>
        </div>
        <div className="col-sm-2 text-center">
          <button className="btn btn-outline-success">Add Contact</button>
        </div>
        <div className="col-sm-2 text-center">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
