import React from 'react'
import {Box, Typography, Card, Stack} from '@mui/material'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignCenterRounded'
import { useNavigate } from 'react-router-dom';
const HomeScreen = () => {
  const navigate = useNavigate() 
  return (
   <Box p={2}>
    <Typography  fontWeight="bold" variant='h4' mb={2}> Text Generation</Typography>
 <Stack direction='row' spacing={6}>
 <Card onClick = {() => navigate("/summary")}
     sx={{borderRadius:5, height:200, width:350, '&:hover':{border:2, borderColor:'primary.dark', cursor:'pointer'} }}>
      <DescriptionRoundedIcon  sx={{color:'primary.dark', mt:2, ml:3, fontSize:40}}/>
      <Stack p={3} pt={0}>
        <Typography fontWeight="bold" variant='h5'>Text Summarize</Typography>
        <Typography variant='h6'>Summarize long and tedious articles into just a few sentences</Typography>
      </Stack>
    </Card>
    <Card onClick = {() => navigate("/paragraph")}
     sx={{borderRadius:5, height:200, width:350, '&:hover':{border:2, borderColor:'primary.dark', cursor:'pointer'} }}>
      <FormatAlignLeftRoundedIcon  sx={{color:'primary.dark', mt:2, ml:3, fontSize:40}}/>
      <Stack p={3} pt={0}>
        <Typography fontWeight="bold" variant='h5'>Paragraph Summarize</Typography>
        <Typography variant='h6'>Generate an informative blurb about any topic</Typography>
      </Stack>
    </Card>
 </Stack>
   

   </Box>
  )
}

export default HomeScreen
