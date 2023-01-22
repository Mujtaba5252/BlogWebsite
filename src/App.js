import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import UserBlog from './components/UserBlog';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import React from 'react';

function App() {
  return (
  
   <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
         
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              
              <Route path="/myBlogs" element={<UserBlog />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          
        </Routes>
      </main>
    </React.Fragment>
   
  );
}

export default App;
