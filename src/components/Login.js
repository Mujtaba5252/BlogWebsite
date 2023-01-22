import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../store";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [isSignup, setisSignup] = useState(false);
  const [input, setInput]=useState({
      firstName:"",
      lastName:"",
      email:"",
      password:""
  })
const handleChange=(e)=>{
  setInput((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value,
  }))
};
const sendRequest=async(type="login")=>{
  const response=await axios.post(`http://localhost:4001/users/${type}`,
  {
    firstName:input.firstName,
    lastName:input.lastName,
    email:input.email,
    password:input.password
  }).catch((err)=>{
    console.log(err);
  })

  const data=await response.data;
  console.log(data);
  return data;
  
}

const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(input);
  if(isSignup){
    sendRequest("signup")
    .then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispatch(authAction.login()))
    .then(()=>navigate("/blogs"))
    
  }
else{
  sendRequest()
  .then((data)=>localStorage.setItem("userId",data.user._id))
  .then(()=>dispatch(authAction.login()))
  .then(()=>navigate("/blogs"))
  
}
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={2}
          borderRadius={5}
          backgroundColor="#b0bec5"
        >
          <Typography variant="h4" padding={1} textAlign="center">
            {isSignup ? "SIGNUP" : "LOGIN"}
          </Typography>
          {isSignup && (
            <>
              
              <TextField name="firstName" value={input.firstName} onChange={handleChange} placeholder="First Name" margin="normal"></TextField>
              <TextField name="lastName" value={input.lastName} onChange={handleChange} placeholder="Last Name" margin="normal"></TextField>
            </>
          )}
          <TextField
            name="email"
            value={input.email}
            onChange={handleChange}
            type={"email"}
            placeholder="Email"
            margin="normal"
          ></TextField>
          <TextField
            name="password"
            value={input.password}
            onChange={handleChange}
            type={"password"}
            placeholder="Password"
            margin="normal"
          ></TextField>

          <Button
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
          
            backgroundColor="#66bb6a"
            type="submit"
          >
            Submit
          </Button>
          <Button
            onClick={() => setisSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Login;
