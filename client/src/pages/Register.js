import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  async function registerUser(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password did not match!");
      return;
    }
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
    window.location.href = "/login";
  }

  return (
    <React.Fragment>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <form className="form" onSubmit={registerUser}>
            <div className="form-group">
              <label className="lead" htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                placeholder="Enter the usernme"
                id="username"
                className="form-control"
                onChange={handleName}
                required="required"
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
                onChange={handleEmail}
                required="required"
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
                onChange={handlePassword}
                required="required"
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
                onChange={handleConfirmPassword}
                required="required"
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
