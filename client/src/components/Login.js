import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../styles.scss";

const Login = props => {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });
  // make a post request to retrieve a token from the api

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/private");
      })
      .catch(err => console.log(err));
  };
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
      <div>
        <h1>Welcome to the Bubble App!</h1>
      </div>
      <div>
        <form onSubmit={login}>
          <h3>Username</h3>
          <input
            type="text"
            name="username"
            value={creds.username}
            onChange={handleChange}
          />
          <h3>Password</h3>
          <input
            type="password"
            name="password"
            value={creds.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
