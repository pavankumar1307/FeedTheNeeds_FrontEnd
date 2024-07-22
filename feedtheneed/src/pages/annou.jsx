import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component
import { useNavigate } from 'react-router-dom';

const AnnouncementList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [value,setValue]=useState("")

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get('http://localhost:2003/announcement');
                setAnnouncements(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);
    const handleLogout = () => {
        navigate('/login');
      };
    
      const handleNavigate = (route) => {
        setValue(route);
        navigate(route);
      };

    
    

    return (
        <>
      <Header handleLogout={handleLogout} />
            <Container maxWidth="lg" style={{ marginTop: 200 }}>
                <Typography variant="h4" gutterBottom>
                    Food Donation Announcements
                </Typography>
                {loading ? (
                    <CircularProgress style={{ margin: 'auto' }} />
                ) : (
                    <Grid container spacing={3}>
                        {announcements.map((announcement) => (
                            <Grid item xs={12} sm={6} md={4} key={announcement.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {announcement.organisationName}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Title:</strong> {announcement.title}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Description:</strong> {announcement.description}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Place:</strong> {announcement.place}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Venue Date and Time:</strong> {announcement.venue_date_time}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
            <br/><br/>
            <Footer value={value} setValue={setValue} navigate={handleNavigate} />
        </>
    );
};

export default AnnouncementList;
