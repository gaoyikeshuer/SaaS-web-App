import React from 'react'
import {Box, Typography, useMediaQuery, useTheme, Button, TextField, Collapse, Alert, Link} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const LoginScreen = () => {
    const theme = useTheme()
    const isNotMobile = useMediaQuery("(min-width: 1000px)")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError]= useState("")
    const navigate = useNavigate()
    const config = {
        headers: {"Content-Type": "application/json"}
    }
    const loginHandler= async(e)=>{
        e.preventDefault();
        try{
            //dont use .then(navigate('/login')) because in this way even if there is some errors in register, it will still go ahead to the login page
       const {data}=  await axios.post('/api/auth/login',{email,password},config)
       if(data.token.accessToken){
        localStorage.setItem("authToken",true)
        navigate("/")
        window.location.reload()
        // we want to change login into logout
       }
        navigate("/")
        console.log("signed in")
        }catch(err){
            console.log(err)
            if(err.response.data.error){
                setError(err.response.data.error);
            } else if(err.message){
                setError(err.message)
            }
            setTimeout(()=>{
                setError("")
            },5000)
        }
    }
  return (
   <Box width={isNotMobile?'50%':'90%' }
   p='2rem'
   m='2rem auto'
   borderRadius={5}
   backgroundColor = {theme.palette.background.alt}
   sx={{boxShadow:5}}
   >
    <Collapse in={error}>
    <Alert severity='error' sx={{mb:2}}>{error}</Alert>
    </Collapse>
    <form onSubmit={loginHandler}>
        <Typography variant='h4'>Sign in</Typography>
        <TextField label="Email" margin="normal" required fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}></TextField>
        <TextField label="Password" type="password" margin="normal" required fullWidth value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
        <Button type='submit' fullWidth size='large' bx={{color:'white', mt:2}}>Sign In</Button>
    </form>
    <Typography mt={2}>Don't have any acccounts?   <Link href='/register'>Sign up</Link> </Typography>
   

   </Box>
  )
}

export default LoginScreen