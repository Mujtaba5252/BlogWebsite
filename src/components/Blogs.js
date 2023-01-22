import React,{useEffect, useState} from 'react'
import axios from 'axios'
import BlogCard from './BlogCard';

function Blogs() {
  const [blogs,setBlogs]=useState();
  const sendRequest=async()=>{
    const response=await axios.get("http://localhost:4001/blog")
    .catch((err)=>{
      console.log(err);
    })
    const data=response.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then ((data)=>{ setBlogs(data.blogs)});
    
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCard
          id={blog._id}
            isUser={localStorage.getItem("userId")===blog.user._id}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
}

export default Blogs