import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function AddBlog() {
  const [input, setInput]=useState({
    title:"",
    description:"",
    imageURL:"",
})
const handleChange=(e)=>{ 
  setInput((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value,
  }))

}
const sendRequest=async()=>{
  const response=await axios.post("http://localhost:4001/blog/add",{
    title:input.title,
    description:input.description,
    image:input.imageURL,
    user:localStorage.getItem("userId")

  }).catch(err=>{console.log(err)})
  const data=await response.data;
  return data
}
const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(input)
  sendRequest().then((data)=>{console.log(data)})
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          width={"80%"}
          border={3}
          borderRadius={10}
          borderColor="gray"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}          
        >
          <Typography fontWeight={"bold"} padding={3} color="grey" variant="h4" textAlign={"center"}>Post Your Blog</Typography>
          <InputLabel sx={{mb:1,mt:2,fontSize:"18px",fontWeight:"bold"}}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={input.title} variant="outlined" />
          <InputLabel sx={{mb:1,mt:2,fontSize:"18px",fontWeight:"bold"}}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={input.description} variant="outlined"/>
          <InputLabel sx={{mb:1,mt:2,fontSize:"18px",fontWeight:"bold"}} >Image URL</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={input.imageURL} variant="outlined"/>
        <Button type="submit" sx={{mt:2,borderRadius:4}} variant="contained" color="success">SUBMIT</Button>
        </Box>
      </form>
    </div>
  );
}

export default AddBlog;
