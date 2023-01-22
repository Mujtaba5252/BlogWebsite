import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, colors, IconButton, Typography } from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function BlogCard({title,description,imageUrl,userName,isUser,id}) {
 
  const navigate=useNavigate();
  const handleEdit=(e)=>{
    navigate(`/myBlogs/${id}`);
  }
  const deleteRequest=async()=>{
    const res=await axios.delete(`http://localhost:4001/blog/${id}`).catch((err)=>console.log(err));
    const data=await res.data;
    return data;
  }

  const handleDelete=(e)=>{ 
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/myBlogs"))
  }
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          "&:hover": {
            boxShadow: "5px 5px 10px #ccc", 
            transform: "scale(1.05)",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><ModeEditOutlineIcon/></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>

            </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "gray" }} aria-label="recipe">
               {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
         
        />
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography
            
            variant="body2"
            color="text.secondary"
          >
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default BlogCard;
