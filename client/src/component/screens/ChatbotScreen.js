import React from 'react'
import {Box, Typography, useMediaQuery, useTheme, Button, TextField, Collapse, Alert, Link, Card, Stack} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
const ChatbotScreen = () => {
    const theme = useTheme()
    const isNotMobile = useMediaQuery("(min-width: 1000px)")
    const [error, setError]= useState("")
    const [text, setText] = useState("");
    const [paragraph, setParagraph] = useState("")
    const chatbotHandler= async(e)=>{
        e.preventDefault();
        try{
       const {data}=  await axios.post('/api/openai/chatbot',{text})
       setParagraph(data)

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
    <form onSubmit={chatbotHandler}>
        <Typography variant='h4' mb={2}>Chat Bot</Typography>
        <Stack direction="row" spacing={1}>
            <Box width="87%">
            <TextField multiline="true" placeholder="Ask any questions here" margin="normal"  fullWidth value={text} onChange={(e)=>setText(e.target.value)}></TextField>
            </Box>

        <Button disableElevation type='submit'  bx={{color:'white'}}>Ask </Button>
        </Stack>

    </form>
    { paragraph?    <Card sx={{mt:4, p:2,boarder:2, boxShadow:0, borderColor:"#CFCFCF",boarderRadius:2, height:"500px", bgcolor:"#F6F6F6"}}>
        <Typography>{paragraph}</Typography>
    </Card>
    :
    <Card sx={{mt:4, p:2,boarder:2, boxShadow:0, borderColor:"#CFCFCF",boarderRadius:2, height:"300px", bgcolor:"#F6F6F6"}}>
    <Typography variant='h4' color='gray' sx={{textAlign:'center', verticalAlign:'middle', lineHeight:'300px'}}>Answer will appear here</Typography>
</Card>

    }

    <Typography mt={2}>Not the tool you are looking for?  <Link href='/'>Go back</Link> </Typography>
   

   </Box>
  )
}

export default ChatbotScreen
