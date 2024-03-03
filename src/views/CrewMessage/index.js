import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  Button,
  Stack
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon from MUI
import IconButton from '@mui/material/IconButton';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function CrewMessage() {
  const [value, setValue] = React.useState(0);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      me: 'John Doe',
      text: "Hey everyone, we have a landscaping job at 123 Maple Street. Let's discuss the details.",
      time: '10:00 AM'
    },
    { id: 2, sender: 'Jane Smith', text: 'Sounds good, boss. What specific tasks do we need to tackle for this job?', time: '10:05 AM' },
    { id: 3, sender: 'Mark Johnson', text: 'Do we have the necessary equipment for this project, John?', time: '10:10 AM' },
    { id: 4, sender: 'Emily Brown', text: "I'll handle the garden beds and flower planting.", time: '10:15 AM' },
    { id: 5, sender: 'David Wilson', text: "I'll take care of mowing the lawn and trimming the bushes.", time: '10:20 AM' },
    {
      id: 6,
      me: 'John Doe',
      text: 'Thanks, Emily and David. Mark, please make sure we have all the required equipment ready by tomorrow morning.',
      time: '10:25 AM'
    },
    {
      id: 7,
      sender: 'Jane Smith',
      text: "Got it, John. I'll double-check our inventory and make any necessary arrangements.",
      time: '10:30 AM'
    },
    { id: 8, sender: 'Mark Johnson', text: 'Will do, boss.', time: '10:35 AM' },
    {
      id: 9,
      me: 'John Doe',
      text: "Great, let's aim to start the job at 8:00 AM sharp. We want to impress our client with our efficiency.",
      time: '10:40 AM'
    }
  ]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = () => {
    // Create a new message object
    const newMessage = {
      id: messages.length + 1, // Assign a unique ID to the message
      me: 'John Doe', // Assuming the user's name is fixed
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Get current time
    };

    // Update the messages array by appending the new message
    setMessages([...messages, newMessage]);

    // Clear the input box after sending the message
    setInputMessage('');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDelete = (id) => {
    // Filter out the message with the given id and update the state
    setMessages(messages.filter((message) => message.id !== id));
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                    <Tab value={0} label="Team A" wrapped />
                    <Tab value={1} label="Tim" />
                    <Tab value={2} label="Adam" />
                    <Tab value={3} label="Dillion" />
                    <Tab value={4} label="Troy" />
                    <Tab value={5} label="Manny" />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Typography variant="h6">Messages</Typography>
                    <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                      {messages.map((message) => (
                        <ListItem
                          key={message.id}
                          alignItems={message.me ? 'flex-start' : 'flex-end'}
                          style={{ flexDirection: message.me ? 'row' : 'row-reverse' }}
                        >
                          {/* <Avatar
                            sx={{ bgcolor: message.me ? 'primary.main' : 'secondary.main', ml: message.me ? 0 : 2, mr: message.me ? 2 : 0 }}
                          >
                            {message.me ? message.me[0] : message.sender[0]}
                          </Avatar> */}
                          <ListItemText
                            primary={
                              <>
                                {message.me ? (
                                  <>
                                    {message.me}
                                    <Typography variant="body2" component="span" color="text.secondary" ml={1}>
                                      {message.time}
                                    </Typography>
                                  </>
                                ) : (
                                  <>
                                    <Typography variant="body2" component="span" color="text.secondary" ml={1}>
                                      {message.sender}
                                    </Typography>
                                    <Typography variant="body2" component="span" color="text.secondary" ml={1}>
                                      {message.time}
                                    </Typography>
                                  </>
                                )}
                              </>
                            }
                            secondary={
                              <>
                                <Stack direction="column">
                                  <Typography variant="body2" component="span" fontWeight="bold">
                                    {message.text}
                                  </Typography>
                                </Stack>
                              </>
                            }
                            style={{ textAlign: message.me ? 'left' : 'right' }}
                          />

                          {message.me && (
                            <IconButton onClick={() => handleDelete(message.id)} aria-label="delete message">
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </ListItem>
                      ))}
                      <TextField
                        label="Type a message..."
                        variant="outlined"
                        fullWidth
                        value={inputMessage}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                      />
                      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1 }}>
                        Send
                      </Button>
                    </List>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Typography variant="h6">My photos</Typography>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>PH</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Photo 1" secondary="July 2023" />
                      </ListItem>
                      {/* Add more items as needed */}
                    </List>{' '}
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {/* Content for Tab One */}
                    <Typography variant="h6">Friends</Typography>
                    <Typography variant="subtitle1">1</Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="h6">Groups</Typography>
                    <Typography variant="subtitle1">3</Typography>
                    {/* Add more items as needed */}{' '}
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    {/* Content for Tab One */}
                    <Typography variant="h6">Friends</Typography>
                    <Typography variant="subtitle1">1</Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="h6">Groups</Typography>
                    <Typography variant="subtitle1">3</Typography>
                    {/* Add more items as needed */}{' '}
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    {/* Content for Tab One */}
                    <Typography variant="h6">Friends</Typography>
                    <Typography variant="subtitle1">1</Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="h6">Groups</Typography>
                    <Typography variant="subtitle1">3</Typography>
                    {/* Add more items as needed */}{' '}
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    {/* Content for Tab One */}
                    <Typography variant="h6">Friends</Typography>
                    <Typography variant="subtitle1">1</Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="h6">Groups</Typography>
                    <Typography variant="subtitle1">3</Typography>
                    {/* Add more items as needed */}{' '}
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default CrewMessage;
