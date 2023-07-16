import React from 'react'
import {Box, Link, Typography, useTheme} from '@mui/material'


const Navbar = () => {
    const theme = useTheme()
  return (
  <Box width="100%" backgroundColor = {theme.palette.background.alt} textAlign ='center' sx={{mb:2}}  >
 <Typography variant='h2' color='primary'>SaaSAI</Typography>
 <Link href='/register' m={1}> Register</Link>
 <Link href='/login' m={1}>Login</Link>
  </Box>
  )
}

export default Navbar
