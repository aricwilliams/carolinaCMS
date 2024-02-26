import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Switch, List, ListItem, ListItemText } from '@mui/material';
// import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
// import SendIcon from '@mui/icons-material/Send';
const teamMembers = [
  { id: 1, name: 'John Doe', title: 'Team Leader', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 2, name: 'Bob Johnson', title: 'Lawn Technician', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 3, name: 'Michael Brown', title: 'Gardener', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 4, name: 'David Martinez', title: 'Horticulturist', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 5, name: 'James Taylor', title: 'Irrigation Specialist', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 6, name: 'Matthew Thomas', title: 'Fertilization Expert', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 7, name: 'Christopher Lee', title: 'Plant Care Technician', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 8, name: 'Daniel Clark', title: 'Mulching Crew Leader', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 9, name: 'Andrew Evans', title: 'Lawn Maintenance Technician', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 10, name: 'Ryan Rodriguez', title: 'Landscaping Crew Foreman', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 11, name: 'Steven Moore', title: 'Arborist', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 12, name: 'Joshua Garcia', title: 'Equipment Operator', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 13, name: 'Tyler Wilson', title: 'Groundskeeper', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 14, name: 'Justin Sanchez', title: 'Sod Installer', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] },
  { id: 15, name: 'Brandon Hernandez', title: 'Weed Control Specialist', social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'] }
];

const Crew = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSwitchToggle = (id) => {
    // Find the member in the selectedMembers array
    const memberIndex = selectedMembers.findIndex((member) => member.id === id);

    if (memberIndex === -1) {
      // If member is not found, add it to the selectedMembers array
      const selectedMember = teamMembers.find((member) => member.id === id);
      setSelectedMembers([...selectedMembers, selectedMember]);
    } else {
      // If member is found, remove it from the selectedMembers array
      const updatedMembers = [...selectedMembers];
      updatedMembers.splice(memberIndex, 1);
      setSelectedMembers(updatedMembers);
    }
  };
  const handleReset = () => {
    setSelectedMembers([]);
  };
  return (
    <>
      <Paper elevation={3} sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={4} justifyContent="space-between" sx={{ mb: 2 }} alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom component="div">
              415 Elm street Wilmington NC
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid item xs={2} sm={2} md={2} key={member.id}>
              <Box textAlign="center">
                <Switch
                  color="primary"
                  checked={selectedMembers.some((selected) => selected.id === member.id)}
                  onChange={() => handleSwitchToggle(member.id)}
                  name={`switch-${member.id}`}
                  size="small"
                />
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2">{member.title}</Typography>
                <Box></Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ marginTop: 2, p: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Selected Team Members
        </Typography>
        <List>
          {selectedMembers.map((member) => (
            <ListItem key={member.id}>
              <ListItemText primary={member.name} secondary={member.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default Crew;
