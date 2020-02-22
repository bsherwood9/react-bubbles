import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { isPropertySignature } from "typescript";

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
    <>
      <h1>Welcome to the Bubble App!</h1>

      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={creds.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={creds.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
