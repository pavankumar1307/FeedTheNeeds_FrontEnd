import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import Showpost from './pages/showPpost'; // Corrected the import statement for 'Showpost'
import Router from './routes';

import NewPost from './pages/newpost';
import Location from './pages/location';
import ScheduledPostForm from './pages/ScheduledPostForm';
import Newfood from './pages/Newfood';
import DonationForm from './pages/donationform';
import AnnouncementList from './pages/annou';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Swiggy orange color
    },
    secondary: {
      main: '#00cc66', // Swiggy green color
    },
    background: {
      default: '#FEFEFA', // Swiggy background color
    },
    text: {
      primary: '#333333', // Text color
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <BrowserRouter>
      <Routes>
        {/* Use a Route component for each route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Showpost />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/location" element={<Location />} />
        <Route path="/newfood" element={<Newfood />} />
        <Route path="/scheduler" element={<ScheduledPostForm />} />
        <Route path="/donationform" element={<DonationForm />} />
        <Route path="/announcement" element={<AnnouncementList />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
