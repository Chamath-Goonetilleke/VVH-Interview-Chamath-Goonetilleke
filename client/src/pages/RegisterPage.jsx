import React, { useState } from "react";
import "./RegisterPage.css";
import { Button, TextField } from "@mui/material";
import { RegisterUser } from "../services/UserService";
export default function RegisterPage() {

    const [user, setUser]=useState({
        name:"",
        email:"",
        password:""
    });

    const handleInputChange = (e)=>{
        const{name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        registerNewUser()
    }

    const registerNewUser = async()=>{
        await RegisterUser(user).then(({data})=>{
            console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
    }


  return (
    <div className="main-container" >
      <form className="reg-form" onSubmit={onSubmit}>
        <h1>Registration</h1>

        <TextField
          margin="normal"
          id="outlined-basic"
          type="text"
          label="User Name"
          variant="outlined"
          fullWidth
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
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
          Register
        </Button>
      </form>
    </div>
  );
}
