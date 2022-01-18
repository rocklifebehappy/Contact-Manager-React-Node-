import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  async function loginUser(event) {
    event.preventDefault();
    console.log("top");
    const respone = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log("top 2");
    const data = await respone.json();
    console.log("here1");
    if (data.user) {
      console.log("here2");
      localStorage.setItem("token", data.user);
      alert("Login Successfull");
      window.location.href = "/";
    } else {
      alert("Please Check your email and Password!");
    }
  }

  return (
    <React.Fragment>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <form className="form" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email" className="lead">
                Email:
              </label>
              <input
                className="form-control"
                id="email"
                placeholder="Enter your email"
                type="text"
                onChange={handleEmail}
                required="required"
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
                onChange={handlePassword}
                required="required"
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
