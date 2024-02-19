import React from 'react';
import { Box, Grid, Typography, Avatar, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import Paper from '@mui/material/Paper';

const teamMembers = [
  { name: 'John Doe', title: 'Team Leader', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { name: 'Alice Smith', title: 'Lawn Technician', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { name: 'Bob Johnson', title: 'Lawn Technician', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { name: 'Emily Davis', title: 'Equipment Operator', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
];
const team2Members = [
  { name: 'Michael Brown', title: 'Team Leader', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { name: 'Emma Wilson', title: 'Lawn Technician', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { name: 'James Anderson', title: 'Lawn Technician', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { name: 'Olivia Martinez', title: 'Equipment Operator', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
];

const socialIcons = {
  Facebook: <Facebook />,
  Twitter: <Twitter />,
  LinkedIn: <LinkedIn />,
  Instagram: <Instagram />,
};

const Crew = () => {
  return (
    <>
    <Paper elevation={3} sx={{ flexGrow: 1, p:2 }}>
      <Typography variant="h4" gutterBottom component="div">
       Team 1
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box textAlign="center">
              <Avatar
                alt={member.name}
                src={`/path/to/${member.name.toLowerCase().replace(/ /g, '_')}.jpg`}
                sx={{ width: 120, height: 120, margin: 'auto' }}
              />
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2">{member.title}</Typography>
              <Box>
                {member.social.map((network) => (
                  <IconButton key={network} color="primary">
                    {socialIcons[network]}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
      <Paper elevation={3} sx={{ flexGrow: 1, my:2, p:2 }}>
      <Typography variant="h4" gutterBottom component="div">
        Team 2
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {team2Members.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box textAlign="center">
              <Avatar
                alt={member.name}
                src={`/path/to/${member.name.toLowerCase().replace(/ /g, '_')}.jpg`}
                sx={{ width: 120, height: 120, margin: 'auto' }}
              />
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2">{member.title}</Typography>
              <Box>
                {member.social.map((network) => (
                  <IconButton key={network} color="primary">
                    {socialIcons[network]}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
    </>
  );
};

export default Crew;
