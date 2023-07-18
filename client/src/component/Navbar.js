import React from 'react'
import {Box, Link, Typography, useTheme} from '@mui/material'
import axios from 'axios'


const Navbar = () => {
    const theme = useTheme()
    const loggedIn= JSON.parse(localStorage.getItem("authToken"))
    const logoutHandler = async ()=>{
        try{
            await axios.post("/api/auth/logout").then(res => fullyLogout(res.data))
        }
        catch(err){
            console.log(err)
        }
    }

    const fullyLogout = (data) =>{
        if(data.success){
            localStorage.removeItem("authToken")
            window.location.reload()
        }
    }
  return (
  <Box width="100%" backgroundColor = {theme.palette.background.alt} textAlign ='center' sx={{mb:2}}  >
 <Typography variant='h2' color='primary'>SaaSAI</Typography>
 <Link href='/register' m={1}> Register</Link>
{loggedIn? <Link href ='/' onClick={logoutHandler} p={2}>Logout</Link> :<Link href='/login' m={1}>Login</Link>} 
  </Box>
  )
}

export default Navbar
