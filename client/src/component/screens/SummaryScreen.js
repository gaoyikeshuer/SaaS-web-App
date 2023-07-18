import React from 'react'
import {Box, Typography, useMediaQuery, useTheme, Button, TextField, Collapse, Alert, Link, Card} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const SummaryScreen = () => {
    const theme = useTheme()
    const isNotMobile = useMediaQuery("(min-width: 1000px)")
    const [error, setError]= useState("")
    const navigate = useNavigate()
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("")
    const summaryHandler= async(e)=>{
        e.preventDefault();
        try{
            //dont use .then(navigate('/login')) because in this way even if there is some errors in register, it will still go ahead to the login page
       const {data}=  await axios.post('/api/auth/summary',{text})
       setSummary(data)

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
    <form onSubmit={summaryHandler}>
        <Typography variant='h4'>Text Summarizer</Typography>
        <TextField placeholder="Enter text you want to summarize here" margin="normal" required fullWidth value={text} onChange={(e)=>setText(e.target.value)}></TextField>
        <Button type='submit' fullWidth size='large' bx={{color:'white', mt:2}}>Summarize</Button>
    </form>
    <Card sx={{mt:4, p:2,boarder:2, boxShadow:0, borderColor:"#CFCFCF",boarderRadius:2, height:"500px", bgcolor:"#F6F6F6"}}>
        <Typography>Summary will appear here</Typography>
    </Card>
    <Typography mt={2}>Not the tool you are looking for?  <Link href='/'>Go back</Link> </Typography>
   

   </Box>
  )
}

export default SummaryScreen