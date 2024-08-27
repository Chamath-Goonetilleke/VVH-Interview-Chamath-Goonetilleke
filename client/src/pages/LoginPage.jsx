import React, { useState } from "react";
import "./LoginPage.css";
import { Button, TextField } from "@mui/material";
import { LoginUser} from "../services/UserService";
export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = async () => {
    await LoginUser(user)
      .then(({ data }) => {
        localStorage.setItem("token",data)
        setTimeout(() => {
            window.location = "/tasks"
        }, 1000);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <TextField
          margin="normal"
          id="outlined-basic"
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
        <Button
          style={{ marginTop: "1rem" }}
          fullWidth
          variant="contained"
          color="success"
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}
