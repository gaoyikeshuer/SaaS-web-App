import React from 'react'
import {Box, Typography, useMediaQuery, useTheme, Button, TextField, Collapse, Alert, Link} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const RegisterScreen = () => {
    const theme = useTheme()
    const isNotMobile = useMediaQuery("(min-width: 1000px)")
    const [username, setUsername] =useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError]= useState("")
    const navigate = useNavigate()
    const config = {
        headers: {"Content-Type": "application/json"}
    }
    const registerHandler= async(e)=>{
        e.preventDefault();
        try{
            //dont use .then(navigate('/login')) because in this way even if there is some errors in register, it will still go ahead to the login page
        await axios.post('/api/auth/register',{username,email,password},config)
        navigate("/login")
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
    <form onSubmit={registerHandler}>
        <Typography variant='h4'>Sign up</Typography>
        <TextField label="Username" margin="normal" required fullWidth value={username} onChange={(e)=>setUsername(e.target.value)}></TextField>
        <TextField label="Email" margin="normal" required fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}></TextField>
        <TextField label="Password" type="password" margin="normal" required fullWidth value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
        <Button type='submit' fullWidth size='large' bx={{color:'white', mt:2}}>Sign Up</Button>
    </form>
    <Typography mt={2}>Already have an acccount?   <Link href='/login'>Sign in</Link> </Typography>
   

   </Box>
  )
}

export default RegisterScreen
