import React from 'react'
import {Box, Typography, useMediaQuery, useTheme, Button, TextField, Collapse, Alert, Link, Card, Stack} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
const SummaryScreen = () => {
    const theme = useTheme()
    const isNotMobile = useMediaQuery("(min-width: 1000px)")
    const [error, setError]= useState("")
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("")
    const summaryHandler= async(e)=>{
        e.preventDefault();
        try{
       const {data}=  await axios.post('/api/openai/summary',{text})
       setSummary(data.summary)

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
        <Typography variant='h4' mb={2}>Text Summarizer</Typography>
        <Stack direction="row" spacing={1}>
            <Box width="87%">
            <TextField multiline="true" placeholder="Enter text you want to summarize here" margin="normal"  fullWidth value={text} onChange={(e)=>setText(e.target.value)}></TextField>
            </Box>

        <Button disableElevation type='submit'  bx={{color:'white'}}>Summarize</Button>
        </Stack>

    </form>
    { summary?    <Card sx={{mt:4, p:2,boarder:2, boxShadow:0, borderColor:"#CFCFCF",boarderRadius:2, height:"500px", bgcolor:"#F6F6F6"}}>
        <Typography>{summary}</Typography>
    </Card>
    :
    <Card sx={{mt:4, p:2,boarder:2, boxShadow:0, borderColor:"#CFCFCF",boarderRadius:2, height:"500px", bgcolor:"#F6F6F6"}}>
    <Typography variant='h3' color='gray' sx={{textAlign:'center', verticalAlign:'middle', lineHeight:'450px'}}>Summary will appear here</Typography>
</Card>

    }

    <Typography mt={2}>Not the tool you are looking for?  <Link href='/'>Go back</Link> </Typography>
   

   </Box>
  )
}

export default SummaryScreen