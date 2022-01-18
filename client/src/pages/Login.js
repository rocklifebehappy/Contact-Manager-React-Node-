import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <form className="form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="lead">
                Email:
              </label>
              <input
                className="form-control"
                id="email"
                placeholder="Enter your email"
                type="text"
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="lead">
                Password:
              </label>
              <input
                className="form-control"
                id="password"
                placeholder="Enter your password"
                type="password"
              ></input>
            </div>
            <div className="form-group">
              <button className="btn btn-success" type="submit">
                <span className="lead">Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <p className="lead">
            Don't have an Account?{" "}
            <Link
              style={{ color: "blue", textDecoration: "inherit" }}
              to="/register"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
