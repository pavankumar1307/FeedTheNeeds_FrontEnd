import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:2003/Showposts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const TimeAgo = ({ timestamp }) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
      const updateTimeAgo = () => {
        const timeAgoString = moment(timestamp, 'DD/MM/YYYY, h:mm:ss a').fromNow();
        setTimeAgo(timeAgoString);
      };

      updateTimeAgo();

      const interval = setInterval(updateTimeAgo, 60000);

      return () => clearInterval(interval);
    }, [timestamp]);

    return <span>{timeAgo}</span>;
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigate = (route) => {
    setValue(route);
    navigate(route);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50', // Green color
      },
      background: {
        default: '#f0f0f0', // Background color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header handleLogout={handleLogout} />
      <div style={{ marginTop: '94px' }}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ 
                maxWidth: 500, 
                minWidth: 500, 
                maxHeight: 600, 
                minHeight: 600, 
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                borderBottom: '3px solid #4CAF50', // Green color for the line
              }}>
                <CardHeader
                  avatar={
                    <Avatar src='' >
                      F
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Feed the need"
                  subheader={<TimeAgo timestamp={post.current_time} />}
                /> 
                <CardMedia
                  component="img"
                  alt={post.caption}
                  height="380"
                  width="100%"
                  image={post.image_url}
                />
                <CardContent sx={{
                  padding: '16px',
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body1" fontWeight="bold" style={{ marginBottom: '10px' }}>
                      <strong>{post.username}</strong>
                    </Typography>
                  </Stack>
                  <Typography variant="body1" style={{ marginBottom: '20px' }}>
                    {post.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Footer value={value} setValue={setValue} navigate={handleNavigate} />
    </ThemeProvider>
  );
};

export default ShowPost;
