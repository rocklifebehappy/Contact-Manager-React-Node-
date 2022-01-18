import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const handleRegister = () =>{
    
  }
  return (
    <React.Fragment>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <form className="form">
            <div className="form-group">
              <label className="lead" htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                placeholder="Enter the usernme"
                id="username"
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label className="lead" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                placeholder="Enter email"
                type="email"
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label className="lead" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="lead">
                Confirm Password:
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                id="confirmPassword"
              ></input>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <p className="lead">
            Alread have an Account?{" "}
            <Link to="/" style={{ color: "blue", textDecoration: "inherit" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
