import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Login = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const formHandler = async (event: any) => {
    event.preventDefault();
    const response = await axios.post(
      `https://localhost:7136/Auth/login/`,
      {
        username: event.target.username.value,
        password: event.target.password.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", response.data.data);
    setLoginStatus(response.data.message);
  };

  return (
    <div>
      <h1>{loginStatus}</h1>
      <form action="" onSubmit={formHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
