import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon from MUI
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

function CrewMessage() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    // John Doe
    [
      {
        id: 1,
        sender: 'John Doe',
        text: "Hey everyone, we have a landscaping job at 123 Maple Street. Let's discuss the details.",
        time: '10:00 AM'
      },
      { id: 2, sender: 'Jane Smith', text: 'Sounds good, boss. What specific tasks do we need to tackle for this job?', time: '10:05 AM' },
      { id: 3, sender: 'John Doe', text: 'We need to mow the lawn, trim the bushes, and plant new flowers.', time: '10:10 AM' },
      { id: 4, sender: 'Emily Brown', text: "I'll take care of planting the flowers.", time: '10:15 AM' },
      { id: 5, sender: 'John Doe', text: 'Great, Emily. Daniel, can you handle the lawn mowing and bush trimming?', time: '10:20 AM' }
    ],
    // Mike
    [
      { id: 1, sender: 'Mike', text: 'Hi there!', time: '9:00 AM' },
      { id: 2, sender: 'You', text: 'Hello Mike!', time: '9:05 AM' },
      { id: 3, sender: 'Mike', text: 'How are you?', time: '9:10 AM' },
      { id: 4, sender: 'You', text: 'I am doing well, thank you!', time: '9:15 AM' },
      { id: 5, sender: 'Mike', text: 'That sounds good.', time: '9:20 AM' }
    ],
    // Joe
    [
      { id: 1, sender: 'Joe', text: 'Good morning, everyone!', time: '8:00 AM' },
      { id: 2, sender: 'You', text: 'Good morning, Joe!', time: '8:05 AM' },
      { id: 3, sender: 'Joe', text: 'Are we ready for today?', time: '8:10 AM' },
      { id: 4, sender: 'You', text: 'Yes, everything is set.', time: '8:15 AM' },
      { id: 5, sender: 'Joe', text: "Perfect, let's make it a productive day!", time: '8:20 AM' }
    ],
    // Kate
    [
      { id: 1, sender: 'Kate', text: 'Good morning, team!', time: '7:30 AM' },
      { id: 2, sender: 'You', text: 'Morning, Kate!', time: '7:35 AM' },
      { id: 3, sender: 'Kate', text: "What's on the agenda for today?", time: '7:40 AM' },
      { id: 4, sender: 'You', text: 'We have a couple of client meetings and some paperwork to finalize.', time: '7:45 AM' },
      { id: 5, sender: 'Kate', text: "Let's get it done!", time: '7:50 AM' }
    ],
    // Emily
    [
      { id: 1, sender: 'Emily', text: 'Morning, everyone!', time: '8:30 AM' },
      { id: 2, sender: 'You', text: 'Morning, Emily!', time: '8:35 AM' },
      { id: 3, sender: 'Emily', text: "What's our plan for today?", time: '8:40 AM' },
      { id: 4, sender: 'You', text: 'We have some design proposals to review and a site visit scheduled.', time: '8:45 AM' },
      { id: 5, sender: 'Emily', text: "Let's make it a productive day!", time: '8:50 AM' }
    ],
    // Daniel
    [
      { id: 1, sender: 'Daniel', text: 'Morning, team!', time: '9:30 AM' },
      { id: 2, sender: 'You', text: 'Morning, Daniel!', time: '9:35 AM' },
      { id: 3, sender: 'Daniel', text: "What's our focus for today?", time: '9:40 AM' },
      { id: 4, sender: 'You', text: 'We have some backend tasks to complete and a client demo later.', time: '9:45 AM' },
      { id: 5, sender: 'Daniel', text: "Let's get it done!", time: '9:50 AM' }
    ],
    // Sophie
    [
      { id: 1, sender: 'Sophie', text: 'Morning, team!', time: '10:30 AM' },
      { id: 2, sender: 'You', text: 'Morning, Sophie!', time: '10:35 AM' },
      { id: 3, sender: 'Sophie', text: "What's our agenda for today?", time: '10:40 AM' },
      { id: 4, sender: 'You', text: 'We have a brainstorming session and some client calls.', time: '10:45 AM' },
      { id: 5, sender: 'Sophie', text: "Let's make it a productive day!", time: '10:50 AM' }
    ],
    // Ben
    [
      { id: 1, sender: 'Ben', text: 'Morning, everyone!', time: '9:00 AM' },
      { id: 2, sender: 'You', text: 'Morning, Ben!', time: '9:05 AM' },
      { id: 3, sender: 'Ben', text: "What's on the agenda for today?", time: '9:10 AM' },
      { id: 4, sender: 'You', text: 'We have some marketing strategies to discuss and a client presentation to prepare.', time: '9:15 AM' },
      { id: 5, sender: 'Ben', text: "Let's make it a successful day!", time: '9:20 AM' }
    ],
    // Linda
    [
      { id: 1, sender: 'Linda', text: 'Good morning, team!', time: '8:30 AM' },
      { id: 2, sender: 'You', text: 'Morning, Linda!', time: '8:35 AM' },
      { id: 3, sender: 'Linda', text: "What's our plan for today?", time: '8:40 AM' },
      { id: 4, sender: 'You', text: 'We have some project updates and a team meeting.', time: '8:45 AM' },
      { id: 5, sender: 'Linda', text: "Let's make it a productive day!", time: '8:50 AM' }
    ],
    // Tom
    [
      { id: 1, sender: 'Tom', text: 'Morning, everyone!', time: '9:30 AM' },
      { id: 2, sender: 'You', text: 'Morning, Tom!', time: '9:35 AM' },
      { id: 3, sender: 'Tom', text: "What's our focus for today?", time: '9:40 AM' },
      { id: 4, sender: 'You', text: 'We have some coding tasks and a project review meeting.', time: '9:45 AM' },
      { id: 5, sender: 'Tom', text: "Let's get it done!", time: '9:50 AM' }
    ]
  ]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const isLessThan600 = useMediaQuery('(max-width:600px)');
  const conversations = [
    { id: 0, title: 'John Doe' },
    { id: 1, title: 'Mike' },
    { id: 2, title: 'Joe' },
    { id: 3, title: 'Kate' },
    { id: 4, title: 'Emily' },
    { id: 5, title: 'Daniel' },
    { id: 6, title: 'Sophie' },
    { id: 7, title: 'Ben' },
    { id: 8, title: 'Linda' },
    { id: 9, title: 'Tom' }
  ];
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = () => {
    const newMessage = {
      id: messages[selectedConversation].length + 1,
      sender: 'You', // Assuming the user's name is 'You'
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages];
    updatedMessages[selectedConversation] = [...updatedMessages[selectedConversation], newMessage];
    setMessages(updatedMessages);

    setInputMessage('');
  };

  const handleChange = (event) => {
    setSelectedConversation(event.target.value);
  };

  const handleDelete = (messageId) => {
    const updatedMessages = messages[selectedConversation].filter((message) => message.id !== messageId);
    const updatedAllMessages = [...messages];
    updatedAllMessages[selectedConversation] = updatedMessages;
    setMessages(updatedAllMessages);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="conversation-select-label">Select Conversation</InputLabel>
            <Select labelId="conversation-select-label" id="conversation-select" value={selectedConversation} onChange={handleChange}>
              {conversations.map((conversation) => (
                <MenuItem key={conversation.id} value={conversation.id}>
                  {conversation.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TabPanel value={selectedConversation} index={selectedConversation}>
            <Typography variant="h6">Messages</Typography>
            <List sx={{ maxHeight: 400, overflow: 'auto' }}>
              {messages[selectedConversation].map((message) => (
                <ListItem
                  key={message.id}
                  alignItems="flex-start"
                  style={{ flexDirection: 'row', justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start' }}
                >
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="body2" component="span" color="text.secondary" ml={1}>
                          {message.sender}
                        </Typography>
                        <Typography variant="body2" component="span" color="text.secondary" ml={1}>
                          {message.time}
                        </Typography>
                      </>
                    }
                    secondary={
                      <>
                        <Stack direction="column">
                          <Typography variant="body2" component="span" fontWeight="bold">
                            {message.text}
                          </Typography>
                        </Stack>{' '}
                        <IconButton onClick={() => handleDelete(message.id)} aria-label="delete message">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                    style={{ textAlign: message.sender === 'You' ? 'right' : 'left' }}
                  />
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>{' '}
            <div style={{ position: 'absolute', bottom: '10px', width: '80%' }}>
              <TextField
                label="Type a message..."
                variant="outlined"
                fullWidth
                value={inputMessage}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <div style={{ textAlign: isLessThan600 ? 'center' : 'left' }}>
                <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1, display: 'inline-block' }}>
                  Send
                </Button>
              </div>
            </div>
          </TabPanel>
        </Paper>
      </Grid>
    </>
  );
}

export default CrewMessage;
