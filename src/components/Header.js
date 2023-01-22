import React, { useState } from 'react'
import { AppBar, Box, Button, Toolbar, Typography,Tabs,Tab } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store';


function Header() {
    const dispatch=useDispatch();
    const [value,setValue]=useState();
    const isLoggedIn = useSelector(state=>state.isLoggedIn);

  return (
    <div >
    <AppBar 
    position="sticky" 
    sx={{borderRadius:10,background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(179,121,128,1) 0%, rgba(122,182,194,1) 72%)"}}
    >
        <Toolbar>
            <Typography variant='h5'>
                Xplore
            </Typography>

           { isLoggedIn && <Box marginLeft={'auto'} marginRight={"auto"}>
                <Tabs 
                textColor='inherit'
                value={value} 
                onChange={(e,val)=>{setValue(val)}}
                >
                    <Tab  LinkComponent={Link} to="/blogs" label="All Blogs" />
                    <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                    
                   

                </Tabs>
            </Box>}

            <Box display="flex" marginLeft="auto">
                {!isLoggedIn && <><Button variant='contained'  sx={{ margin: 1 ,borderRadius:10,color:blue }}
                LinkComponent={Link} to="/auth"
                 >
                    Login
                </Button>
                < Button variant='contained'  sx={{ margin: 1 , borderRadius:10 ,color:blue}}
                LinkComponent={Link} to="/auth"
                >
                    Register
                </Button>
                </>}
                {isLoggedIn && < Button variant='contained' color='error' sx={{ margin: 1 , borderRadius:10,  }}
                 LinkComponent={Link} to="/auth"
                 onClick={()=>dispatch(authAction.logout())}
                 >
                    Logout
                </Button>}
            </Box>
            
        </Toolbar>
        
    </AppBar>
  
    </div>
  )
}

export default Header