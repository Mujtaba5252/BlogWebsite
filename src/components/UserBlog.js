import axios from 'axios';
import React, { useState,useEffect} from 'react'
import BlogCard from './BlogCard';

function UserBlog() {
  const [user,setUser]=useState();
  const id=localStorage.getItem("userId");
  const sendRequest=async()=>{
    const response=await axios.get(`http://localhost:4001/blog/user/${id}`).catch((err)=>{console.log(err);})
    const data=response.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then ((data)=>{ setUser(data.user)});
  }, []);
  console.log(user);

  return (
    <div>
      {" "}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <BlogCard 
          key={index}
          id={blog._id}
          isUser={true}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
}

export default UserBlog