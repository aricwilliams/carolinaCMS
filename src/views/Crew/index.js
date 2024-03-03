import React, { useState } from 'react';
import { useEffect } from 'react';
import { Box, Grid, Typography, Button, Switch, List, ListItem, ListItemText } from '@mui/material';
// import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { teamState } from '../../atom';
import { useRecoilState } from 'recoil';

// import SendIcon from '@mui/icons-material/Send';

const Crew = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamMembers, setTeamMembers] = useRecoilState(teamState);
  const [team, setTeam] = useState([]); // Local state for team
  // const saveState = (key, state) => {
  //   localStorage.setItem(key, JSON.stringify(state));
  // };

  // Function to load state from localStorage
  const serializedState = JSON.parse(localStorage.getItem('team'));

  useEffect(() => {
    // Set local state once Recoil state is initialized
    if (teamMembers.length > 0) {
      setTeam(teamMembers);
    }
  }, []);
  console.log(team);
  const handleSwitchToggle = (id) => {
    // Find the member in the selectedMembers array
    const memberIndex = selectedMembers.findIndex((member) => member.id === id);

    if (memberIndex === -1) {
      // If member is not found, add it to the selectedMembers array
      const selectedMember = serializedState.find((member) => member.id === id);
      setSelectedMembers([...selectedMembers, selectedMember]);
      setTeamMembers([...selectedMembers, selectedMember]);
    } else {
      // If member is found, remove it from the selectedMembers array
      const updatedMembers = [...selectedMembers];
      updatedMembers.splice(memberIndex, 1);
      setSelectedMembers(updatedMembers);
      setTeamMembers(updatedMembers);
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
          {serializedState &&
            serializedState.map((member) => (
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
