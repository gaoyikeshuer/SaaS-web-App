import {Routes, Route} from 'react-router-dom'
import {useMemo} from 'react'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {createTheme} from '@mui/material/styles'
import {themeSettings} from './theme'
import HomeScreen from './component/screens/HomeScreen';
import LoginScreen from './component/screens/LoginScreen';
import RegisterScreen from './component/screens/RegisterScreen';
import Navbar from './component/Navbar'
import SummaryScreen from './component/screens/SummaryScreen'
function App() {
  const theme = useMemo(()=>createTheme(themeSettings()),[])
  return (
    <div className="App">
      <ThemeProvider theme={theme}/>
      <CssBaseline/>
      <Navbar/>
      <Routes>
      <Route exact path="/" element ={<HomeScreen/>} />
      <Route exact path="/login" element={<LoginScreen/>} />
      <Route exact path="/register" element= {<RegisterScreen/>}/>
      <Route exact path='/summary' element={<SummaryScreen/>}/>
      </Routes>

    </div>
  );
}

export default App;
