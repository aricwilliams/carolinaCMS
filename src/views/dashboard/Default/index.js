import React, { useEffect, useState } from 'react';
import { Grid, Typography, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSetRecoilState } from 'recoil';
import { teamState } from '../../../atom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const setRecoilTeamMembers = useSetRecoilState(teamState);

  useEffect(() => {
    const teamMembers2 = [
      { id: 1, name: 'John Doe', title: 'Team Leader' },
      { id: 2, name: 'Bob Johnson', title: 'Lawn Technician' },
      { id: 3, name: 'James Taylor', title: 'Irrigation Specialist' },
      { id: 4, name: 'Daniel Clark', title: 'Mulching Crew Leader' },
      { id: 5, name: 'Andrew Evans', title: 'Lawn Maintenance Technician' },
      { id: 6, name: 'Justin Sanchez', title: 'Sod Installer' },
      { id: 7, name: 'Brandon Hernandez', title: 'Weed Control Specialist' }
    ];

    // Set Recoil state
    setRecoilTeamMembers(teamMembers2);

    // Save to localStorage
    localStorage.setItem('team', JSON.stringify(teamMembers2));

    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, setRecoilTeamMembers]);

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={12}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {isLoading ? (
            <Stack direction="column">
              <Grid item>
                <Typography variant="h4" gutterBottom component="div">
                  Loading Data
                </Typography>
              </Grid>
              <Grid item>
                <CircularProgress color="secondary" />
              </Grid>
            </Stack>
          ) : (
            <Typography variant="h4" gutterBottom component="div">
              Default Dashboard
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
