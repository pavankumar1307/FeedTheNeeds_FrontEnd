import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, Link, Avatar, Card, Box, Snackbar, Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Import the check mark icon
import axios from 'axios';
import Cookies from 'js-cookie';
import MuiAlert from '@mui/material/Alert';
import logoImg from './logoi.png';

// Import your logo SVG image
import logoSvg from './icons/loginside.svg';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (openDialog) {
      const timer = setTimeout(() => {
        setOpenDialog(false);
        navigate('/home');
      }, 3000); // Close the dialog after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [openDialog, navigate]);

  const handleLogin = () => {
    if (email === '' || password === '') {
      toast.error("Please Enter Email or Password");
      return;
    }

    const loginEndpoint = 'http://localhost:2003/login';

    axios.post(loginEndpoint, { email, password })
      .then((response) => {
        if (response.status === 200) {
          const { userid, name, email } = response.data;
          Cookies.set('userData', JSON.stringify({ userid, name, email }));
          setOpenDialog(true);
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      })
      .catch(() => {
        toast.error("Invalid email or password. Please try again.");
      });
  };

  const navigateToRegister = () => {
    navigate('/signup');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/home');
  };

  return (
    <>
      <Grid container spacing={0} sx={{ height: '100vh' }}>
        {/* Left half with SVG image */}
        <Grid item xs={12} md={6} >
          <img src={logoSvg} alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </Grid>

        {/* Right half with login card */}
        
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <Card sx={{ padding: 3, borderRadius: 5, backgroundColor: '#fff', boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
          <img src={logoImg} alt="Logo" style={{ width: '304px',  height: '84px', marginBottom: '20px', marginLeft: '120px'}} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#4CAF50' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ color: '#333', fontWeight: 'bold' }}>
                Sign in to Your Account
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{ mt: 2 }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#4CAF50', color: '#fff', '&:hover': { backgroundColor: '#45a049' } }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={navigateToRegister} variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold', cursor: 'pointer' }}>
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} sx={{ backgroundColor: '#f44336', color: '#fff' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          Invalid email or password. Please try again.
        </Alert>
      </Snackbar>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent sx={{ backgroundColor: '#fff', textAlign: 'center', padding: '2rem' }}>
          <CheckCircleOutlineIcon sx={{ color: '#4CAF50', fontSize: '5rem', marginBottom: '1rem' }} />
          <Typography variant="h6" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1">
            Login successful! Welcome back!
          </Typography>
        </DialogContent>
      </Dialog>

      {/* ToastContainer from react-toastify */}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default Login;
